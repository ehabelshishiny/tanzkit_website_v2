# Lucide Icons Guide for Editors

## Overview

The Tranzkit website uses **Lucide Icons** - a beautiful, consistent icon library with **1000+ icons** available for use throughout the site.

## How to Use Icons in Sanity Studio

### Icon Picker Interface

When you see an "Icon" field in Sanity Studio, you'll get an enhanced icon picker with:

1. **Visual Preview** - See the selected icon displayed at the top
2. **Autocomplete Search** - Type to search through all 1000+ icons
3. **Popular Icons Grid** - Quick selection from commonly used icons
4. **Live Icon Preview** - See each icon as you browse

### Using the Icon Picker

1. **Quick Selection (Popular Icons)**
   - When the field is empty, you'll see a grid of 24 popular icons
   - Click any icon to select it instantly
   - Perfect for common use cases

2. **Search for Specific Icons**
   - Start typing in the search box (e.g., "car", "user", "arrow")
   - The list will filter to show matching icons
   - Click on any result to select it

3. **Browse All Icons**
   - Type any keyword to see related icons
   - Examples:
     - "arrow" → ArrowRight, ArrowLeft, ArrowUp, ArrowDown, etc.
     - "user" → User, Users, UserPlus, UserCheck, UserX, etc.
     - "car" → Car, Truck, Bus, Bike, Plane, Ship, etc.

## Popular Icon Categories

### Transportation & Logistics
- `Car`, `Truck`, `Bus`, `Bike`, `Plane`, `Ship`, `Train`
- `Navigation`, `Map`, `MapPin`, `Compass`, `Route`
- `Package`, `ShoppingCart`, `ShoppingBag`

### Business & Finance
- `Building`, `Building2`, `Store`, `Home`
- `DollarSign`, `CreditCard`, `Wallet`, `Receipt`
- `TrendingUp`, `TrendingDown`, `BarChart`, `PieChart`

### People & Users
- `User`, `Users`, `UserPlus`, `UserMinus`, `UserCheck`, `UserX`
- `UserCircle`, `Contact`, `Users2`

### Communication
- `Mail`, `Phone`, `MessageSquare`, `MessageCircle`
- `Send`, `Inbox`, `AtSign`

### Actions & UI
- `Check`, `X`, `Plus`, `Minus`, `Edit`, `Trash`
- `Search`, `Filter`, `Settings`, `Menu`
- `ChevronRight`, `ChevronLeft`, `ChevronUp`, `ChevronDown`
- `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`

### Technology
- `Monitor`, `Smartphone`, `Tablet`, `Laptop`
- `Cpu`, `HardDrive`, `Database`, `Server`, `Cloud`
- `Wifi`, `Bluetooth`, `Battery`, `Power`

### Features & Benefits
- `Zap` (Speed/Performance)
- `Shield` (Security)
- `Lock` (Privacy)
- `Star` (Quality/Rating)
- `Award`, `Trophy`, `Medal` (Achievement)
- `Target` (Goals)
- `CheckCircle` (Success)
- `AlertCircle` (Warning)

### Time & Calendar
- `Clock`, `Calendar`, `Timer`, `Hourglass`
- `Sun`, `Moon`, `Sunrise`, `Sunset`

### Files & Documents
- `File`, `FileText`, `Folder`, `FolderOpen`
- `Download`, `Upload`, `Share`, `Link`
- `Image`, `Video`, `Music`, `Camera`

### Weather & Nature
- `Sun`, `Moon`, `Cloud`, `CloudRain`, `CloudSnow`
- `Wind`, `Droplet`, `Flame`, `Sparkles`

## Icon Naming Convention

Lucide icons follow a consistent naming pattern:
- **PascalCase** (e.g., `UserPlus`, `ArrowRight`, `ShoppingCart`)
- **Descriptive names** (e.g., `TrendingUp` not `Arrow1`)
- **Directional suffixes** (e.g., `ChevronRight`, `ArrowLeft`)
- **State variations** (e.g., `Eye`, `EyeOff`, `Lock`, `Unlock`)

## Tips for Choosing Icons

1. **Be Consistent** - Use similar icon styles across related features
2. **Be Descriptive** - Choose icons that clearly represent the content
3. **Test Visibility** - Some icons work better at different sizes
4. **Consider Context** - Icons should make sense in both light and dark modes

## Finding the Right Icon

### Search Tips
- Use **keywords** related to the concept (e.g., "money" → DollarSign, Wallet, CreditCard)
- Try **synonyms** (e.g., "fast" → Zap, Rocket, TrendingUp)
- Look for **related terms** (e.g., "security" → Shield, Lock, Key)

### Common Use Cases

| Use Case | Recommended Icons |
|----------|------------------|
| Speed/Performance | `Zap`, `Rocket`, `TrendingUp` |
| Security | `Shield`, `Lock`, `Key` |
| Users/People | `Users`, `UserCircle`, `Contact` |
| Location | `MapPin`, `Map`, `Navigation` |
| Time | `Clock`, `Calendar`, `Timer` |
| Success | `CheckCircle`, `Check`, `ThumbsUp` |
| Error/Warning | `AlertCircle`, `XCircle`, `AlertTriangle` |
| Information | `Info`, `HelpCircle`, `MessageCircle` |

## Full Icon List

To see all available icons, visit: [https://lucide.dev/icons/](https://lucide.dev/icons/)

The icon picker in Sanity Studio includes all icons from this library, so you can search and select any icon you see on the Lucide website.

## Technical Details (For Developers)

- **Library**: lucide-react
- **Total Icons**: 1000+
- **Format**: React components
- **Size**: Scalable (SVG-based)
- **Customization**: Color, size, and stroke width can be adjusted programmatically

