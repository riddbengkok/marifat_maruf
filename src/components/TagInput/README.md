# 🏷️ Simple Tag Input Component

A fully-featured, accessible, and type-safe Tag Input component built with React and TypeScript.

## 📋 Overview

This component was created as part of a 30-minute live coding test to demonstrate proficiency in:
- React functional components and Hooks
- TypeScript type safety
- Event handling and state management
- User input validation
- Accessibility best practices
- Component testing

## ✨ Features

### Core Functionality
- ✅ **Add Tags**: Press `Enter` to add tags
- ✅ **Remove Tags**: Click the × button to remove tags
- ✅ **Input Validation**: Prevents empty and duplicate tags
- ✅ **Auto-clear**: Input field clears after successful tag addition

### Advanced Features
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- ♿ **Accessible**: ARIA labels and keyboard navigation
- 🔒 **Type-safe**: Full TypeScript support
- ⚙️ **Configurable**: Multiple props for customization
- 🧪 **Well-tested**: Comprehensive test suite included

## 🚀 Usage

### Basic Usage

```tsx
import TagInput from '@/components/TagInput';

function App() {
  return <TagInput placeholder="Enter tags..." />;
}
```

### With Props

```tsx
<TagInput
  initialTags={['React', 'TypeScript']}
  placeholder="Add your tags..."
  maxTags={10}
  caseSensitive={true}
/>
```

## 📖 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialTags` | `string[]` | `[]` | Initial tags to display |
| `placeholder` | `string` | `'Type a tag and press Enter...'` | Input placeholder text |
| `maxTags` | `number` | `undefined` | Maximum number of tags allowed |
| `caseSensitive` | `boolean` | `true` | Whether duplicate checking is case-sensitive |

## 🎯 Validation Rules

1. **No Empty Tags**: Tags with only whitespace are rejected
2. **No Duplicates**: Duplicate tags are prevented (configurable case-sensitivity)
3. **Max Limit**: Optional maximum tag limit with user feedback
4. **Trimming**: Whitespace is automatically trimmed from tags

## 🎨 Styling

The component uses CSS modules with:
- Smooth animations for tag appearance
- Hover and focus states for better UX
- Responsive design for mobile devices
- Error shake animation for invalid inputs
- Gradient backgrounds and modern aesthetics

## 🧪 Testing

Run the test suite:

```bash
npm test TagInput.test.tsx
```

### Test Coverage

- ✅ Component rendering
- ✅ Adding tags (single and multiple)
- ✅ Removing tags
- ✅ Empty tag validation
- ✅ Duplicate tag validation
- ✅ Max tags limit
- ✅ Case-sensitive/insensitive modes
- ✅ Accessibility features
- ✅ Error handling

## 🏗️ Architecture

### Component Structure

```
TagInput/
├── TagInput.tsx       # Main component logic
├── TagInput.css       # Styling
├── TagInput.test.tsx  # Test suite
├── index.ts           # Export barrel
└── README.md          # Documentation
```

### State Management

The component uses React's `useState` hook to manage:
- `tags`: Array of current tags
- `inputValue`: Current input field value
- `error`: Error message for validation feedback

### Key Functions

- `handleInputChange`: Updates input value and clears errors
- `addTag`: Validates and adds new tags
- `handleKeyDown`: Handles Enter key press
- `removeTag`: Removes tag at specified index

## 🎓 Design Principles Applied

### Atomic Design
- **Atom**: Individual tag element
- **Molecule**: Tag with remove button
- **Organism**: Complete TagInput component

### Best Practices
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Separation of Concerns
- Accessibility First
- Type Safety

## 🔍 Assumptions Made

1. **Case-sensitive by default**: Tags are case-sensitive unless specified otherwise
2. **No backend integration**: Component manages state locally
3. **Basic styling**: Focus on functionality over pixel-perfect design
4. **Enter key only**: Only Enter key adds tags (not comma, tab, etc.)
5. **No tag editing**: Tags can only be added or removed, not edited in place

## 🚦 Demo

Visit the demo page at `/tag-input-demo` to see the component in action with:
- Basic usage example
- Max tags limit example
- Feature showcase
- Interactive testing

## 📝 Future Enhancements

Potential improvements for production use:
- [ ] Tag editing functionality
- [ ] Multiple key triggers (comma, tab)
- [ ] Tag autocomplete/suggestions
- [ ] Custom tag validation rules
- [ ] Export/import tags functionality
- [ ] Drag and drop reordering
- [ ] Tag categories/colors
- [ ] Backend integration hooks

## 👨‍💻 Author

Built with ❤️ by Marifat Maruf as part of a ReactJS & TypeScript live coding test.

## 📄 License

This component is part of a portfolio project and is available for educational purposes.
