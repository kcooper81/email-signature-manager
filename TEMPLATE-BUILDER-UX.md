# Template Builder UX - Bidirectional Sync

## Overview

The template builder now supports seamless switching between **Quick Form** and **Advanced Builder** with intelligent bidirectional synchronization.

## How It Works

### Quick Form Mode
- **Simple form interface** for non-technical users
- Fields: Name, Title, Company, Contact Info, Social Links, Disclaimer
- **Auto-syncs** changes to blocks in real-time when editing existing signatures
- Button changes from "Generate Signature" to "Update Signature" when editing

### Advanced Builder Mode
- **Full block-based editor** with drag-and-drop
- Granular control over every block type
- Add custom HTML, buttons, multiple images, etc.

### Bidirectional Sync

#### From Quick Form → Blocks
- Form changes automatically update the underlying block structure
- Maintains block IDs to preserve order and relationships
- Updates happen in real-time (no need to click "Generate")

#### From Blocks → Quick Form
- When switching to Quick Form, blocks are parsed into form fields
- Intelligent detection identifies:
  - **Name**: Bold text, large font (≥16px)
  - **Company**: Bold text with purple color (#7c3aed)
  - **Title**: Regular text, smaller font
  - **Contact Info**: Email, phone, website, address from contact-info block
  - **Social Links**: LinkedIn, Twitter, Facebook, Instagram from social block
  - **Disclaimer**: Text from disclaimer block
  - **Photo**: Image URL from image block

### Compatibility Detection

Quick Form is **automatically disabled** when the signature contains:
- ❌ Custom HTML blocks
- ❌ Button blocks
- ❌ Multiple images (only 1 profile photo supported)
- ❌ Multiple contact-info blocks
- ❌ Multiple social blocks
- ❌ Multiple disclaimer blocks
- ❌ More than 5 text blocks

### User Experience

#### Starting Fresh
1. User creates new template → defaults to Quick Form
2. Fill out form → click "Generate Signature"
3. Blocks are created, can switch to Advanced Builder for tweaks

#### Editing Existing Compatible Signature
1. Open template → defaults to Advanced Builder (has blocks)
2. Switch to Quick Form → form populates from blocks
3. Edit form fields → blocks update automatically
4. Switch back to Advanced Builder → see changes reflected

#### Editing Complex Signature
1. Open template with custom blocks
2. Quick Form tab shows "(Unavailable)"
3. Info alert explains why: "Contains custom blocks (HTML, buttons, or multiple images)"
4. Must use Advanced Builder

### UI Indicators

**Tab Labels:**
- ✅ "Quick Form" - Available
- 🚫 "Quick Form (Unavailable)" - Disabled due to incompatible blocks

**Alerts:**
- **Blue Info Alert** (Quick Form): "Editing in Quick Form will update your signature blocks. Switch to Advanced Builder for more control."
- **Yellow Warning Alert** (When trying to switch): "Quick Form is disabled because this signature contains custom blocks..."

## Technical Implementation

### Key Files Modified

1. **`editor.tsx`**
   - Added `quickFormCompatible` state
   - Added `isQuickFormCompatible()` function
   - Added `handleModeChange()` with validation
   - Added `handleQuickFormUpdate()` for real-time sync
   - Added compatibility checking on block changes

2. **`quick-form.tsx`**
   - Added `blocksToFormData()` helper function
   - Added `initialBlocks` prop
   - Added `onUpdate` callback for real-time sync
   - Added auto-update effect when form changes
   - Button text changes based on context

3. **`alert.tsx`** (New)
   - shadcn/ui Alert component for user feedback

### Data Flow

```
┌─────────────────────────────────────────────────┐
│              Template Editor                     │
│                                                  │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │  Quick Form  │◄───────►│     Blocks      │  │
│  │              │  Sync   │   (JSON Array)  │  │
│  └──────────────┘         └─────────────────┘  │
│         │                          │            │
│         │                          │            │
│         ▼                          ▼            │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │ Form Fields  │         │ Advanced Builder│  │
│  │ (State)      │         │ (Block Editor)  │  │
│  └──────────────┘         └─────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Benefits

✅ **Flexibility**: Users can switch between modes based on their needs
✅ **No Data Loss**: Switching modes preserves all data
✅ **Clear Boundaries**: Users know when Quick Form can't handle complexity
✅ **Real-time Updates**: Changes in Quick Form immediately reflect in preview
✅ **Intuitive**: Disabled states and alerts guide users appropriately

## Future Enhancements

- [ ] Add "Simplify for Quick Form" button to convert complex signatures
- [ ] Support multiple text blocks with better field mapping
- [ ] Add preset templates in Quick Form
- [ ] Visual diff when switching modes to show what changed
