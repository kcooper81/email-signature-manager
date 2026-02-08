import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Label, Input, Button } from '@/components/ui';
import { Loader2, Save } from 'lucide-react';

interface EditMemberModalProps {
  open: boolean;
  onClose: () => void;
  memberName: string;
  editForm: {
    first_name: string;
    last_name: string;
    title: string;
    department: string;
    calendly_url: string;
    linkedin_url: string;
    twitter_url: string;
    github_url: string;
    personal_website: string;
    instagram_url: string;
    facebook_url: string;
    youtube_url: string;
  };
  setEditForm: (form: any) => void;
  onSave: () => void;
  updating: boolean;
}

export function EditMemberModal({
  open,
  onClose,
  memberName,
  editForm,
  setEditForm,
  onSave,
  updating,
}: EditMemberModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Edit Team Member</ModalTitle>
        <ModalDescription>
          Update information for {memberName}
        </ModalDescription>
      </ModalHeader>
      <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_first_name">First Name</Label>
              <Input
                id="edit_first_name"
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_last_name">Last Name</Label>
              <Input
                id="edit_last_name"
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit_title">Job Title</Label>
            <Input
              id="edit_title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit_department">Department</Label>
            <Input
              id="edit_department"
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              placeholder="Engineering"
            />
          </div>
        </div>

        {/* Personal Links */}
        <div className="space-y-4 pt-4 border-t">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Personal Links (Optional)</h3>
            <p className="text-xs text-gray-500 mt-1">
              These links can be used in signature templates with placeholders like {'{'}{'{'} calendly_url {'}'}{'}'}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit_calendly_url">📅 Calendly URL</Label>
            <Input
              id="edit_calendly_url"
              type="url"
              value={editForm.calendly_url}
              onChange={(e) => setEditForm({ ...editForm, calendly_url: e.target.value })}
              placeholder="https://calendly.com/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_linkedin_url">💼 LinkedIn Profile</Label>
            <Input
              id="edit_linkedin_url"
              type="url"
              value={editForm.linkedin_url}
              onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_twitter_url">🐦 Twitter/X Profile</Label>
            <Input
              id="edit_twitter_url"
              type="url"
              value={editForm.twitter_url}
              onChange={(e) => setEditForm({ ...editForm, twitter_url: e.target.value })}
              placeholder="https://twitter.com/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_github_url">💻 GitHub Profile</Label>
            <Input
              id="edit_github_url"
              type="url"
              value={editForm.github_url}
              onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
              placeholder="https://github.com/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_personal_website">🌐 Personal Website</Label>
            <Input
              id="edit_personal_website"
              type="url"
              value={editForm.personal_website}
              onChange={(e) => setEditForm({ ...editForm, personal_website: e.target.value })}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_instagram_url">📸 Instagram</Label>
            <Input
              id="edit_instagram_url"
              type="url"
              value={editForm.instagram_url}
              onChange={(e) => setEditForm({ ...editForm, instagram_url: e.target.value })}
              placeholder="https://instagram.com/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_facebook_url">📘 Facebook</Label>
            <Input
              id="edit_facebook_url"
              type="url"
              value={editForm.facebook_url}
              onChange={(e) => setEditForm({ ...editForm, facebook_url: e.target.value })}
              placeholder="https://facebook.com/yourname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_youtube_url">🎥 YouTube Channel</Label>
            <Input
              id="edit_youtube_url"
              type="url"
              value={editForm.youtube_url}
              onChange={(e) => setEditForm({ ...editForm, youtube_url: e.target.value })}
              placeholder="https://youtube.com/@yourname"
            />
          </div>
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={updating}>
          {updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
