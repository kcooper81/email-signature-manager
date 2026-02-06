import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendTicketResponseEmail } from '@/lib/email/resend';
import { logException } from '@/lib/error-logging';

export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { content, isInternal } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: userData } = await supabase
      .from('users')
      .select('id, email, is_admin')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.is_admin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { data: ticket } = await supabase
      .from('feedback')
      .select('id, user_email, type, message')
      .eq('id', params.ticketId)
      .single();

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    const { data: note, error: insertError } = await supabase
      .from('ticket_notes')
      .insert({
        ticket_id: params.ticketId,
        author_id: userData.id,
        content: content.trim(),
        is_internal: isInternal !== false,
        email_sent: false,
      })
      .select('id, content, is_internal, created_at')
      .single();

    if (insertError) {
      console.error('Error inserting note:', insertError);
      return NextResponse.json(
        { error: 'Failed to create note' },
        { status: 500 }
      );
    }

    if (!isInternal && ticket.user_email) {
      try {
        await sendTicketResponseEmail({
          to: ticket.user_email,
          ticketId: ticket.id,
          ticketType: ticket.type,
          originalMessage: ticket.message,
          responseMessage: content.trim(),
          adminEmail: userData.email,
        });

        await supabase
          .from('ticket_notes')
          .update({ email_sent: true })
          .eq('id', note.id);

        return NextResponse.json({
          success: true,
          note: {
            ...note,
            email_sent: true,
            authorEmail: userData.email,
          },
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
        
        await logException(emailError, {
          route: `/api/admin/tickets/${params.ticketId}/notes`,
          method: 'POST',
          errorType: 'api_error',
          metadata: { ticketId: params.ticketId },
        });

        return NextResponse.json({
          success: true,
          note: {
            ...note,
            email_sent: false,
            authorEmail: userData.email,
          },
          warning: 'Note created but email failed to send',
        });
      }
    }

    return NextResponse.json({
      success: true,
      note: {
        ...note,
        authorEmail: userData.email,
      },
    });
  } catch (error) {
    console.error('Ticket note creation error:', error);
    
    await logException(error, {
      route: `/api/admin/tickets/${params.ticketId}/notes`,
      method: 'POST',
      errorType: 'api_error',
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
