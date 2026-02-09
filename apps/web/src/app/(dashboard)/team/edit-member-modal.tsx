import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Label, Input, Button } from '@/components/ui';
import { Loader2, Save, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface EditMemberModalProps {
  open: boolean;
  onClose: () => void;
  memberName: string;
  memberEmail: string;
  canEditEmail: boolean;
  isSyncedUser: boolean;
  editForm: {
    email: string;
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
  onDelete: () => void;
  updating: boolean;
  deleting: boolean;
}

export function EditMemberModal({
  open,
  onClose,
  memberName,
  memberEmail,
  canEditEmail,
  isSyncedUser,
  editForm,
  setEditForm,
  onSave,
  onDelete,
  updating,
  deleting,
}: EditMemberModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClose = () => {
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalHeader>
        <ModalTitle>Edit Team Member</ModalTitle>
        <ModalDescription>
          Update information for {memberName}
        </ModalDescription>
      </ModalHeader>
      <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Delete this team member?</p>
                <p className="text-sm text-red-600 mt-1">
                  This will permanently remove {memberName || memberEmail} from your team. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
                disabled={deleting}
              >
                {deleting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</>
                ) : (
                  <><Trash2 className="mr-2 h-4 w-4" />Delete</>  
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
            {isSyncedUser && (
              <p className="text-xs text-amber-600 mt-1">
                Name, title, and department are managed by your identity provider and will sync automatically.
              </p>
            )}
          </div>
          
          {/* Email - only editable for manually added users */}
          <div className="space-y-2">
            <Label htmlFor="edit_email">Email Address</Label>
            {canEditEmail ? (
              <Input
                id="edit_email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="email@example.com"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  id="edit_email"
                  type="email"
                  value={memberEmail}
                  disabled
                  className="bg-gray-50"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">Synced user</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit_first_name">First Name</Label>
              <Input
                id="edit_first_name"
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                placeholder="John"
                disabled={isSyncedUser}
                className={isSyncedUser ? 'bg-gray-50' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_last_name">Last Name</Label>
              <Input
                id="edit_last_name"
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                placeholder="Doe"
                disabled={isSyncedUser}
                className={isSyncedUser ? 'bg-gray-50' : ''}
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
              disabled={isSyncedUser}
              className={isSyncedUser ? 'bg-gray-50' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit_department">Department</Label>
            <Input
              id="edit_department"
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              placeholder="Engineering"
              disabled={isSyncedUser}
              className={isSyncedUser ? 'bg-gray-50' : ''}
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
      <ModalFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={updating || deleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
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
        </div>
      </ModalFooter>
    </Modal>
  );
}
