# Alys Beach Real Estate Website Clone

An exact replica of the [Alys Beach Real Estate website](https://alysbeach.com/real-estate/) built with modern web technologies.

## 🏖️ **Live Demo**

The website is running locally at: `http://localhost:3000`

## ✨ **Features Replicated**

### **🧭 Navigation & Header**
- **Responsive navigation** with dropdown menus
- **Real Estate, Vacation, About, Events** menu items
- **Search functionality** with animated dropdown
- **Call-to-action buttons**: "Real Estate Listings" & "Book Your Stay"
- **Mobile-responsive** hamburger menu

### **🎨 Hero Section**
- **Full-screen hero** with beach-themed gradient background
- **"REAL ESTATE - THE BEAUTY OF HOME"** typography
- **Animated scroll indicator**
- **Smooth fade-in animations** using Framer Motion

### **📋 Content Sections**
1. **Why Alys** - Three-column feature grid
2. **The Process** - Custom experience description
3. **Alys Insider** - Newsletter subscription section
4. **Fortified for Safer Living** - Construction standards
5. **Somerset Program** - Custom home designs
6. **Beach Club** - Exclusive amenity details
7. **Owner Services** - Comprehensive service description

### **🎯 Interactive Elements**
- **Newsletter signup form** (fixed bottom-right)
- **Live Beach Cam widget** (fixed bottom-left)
- **Animated weather display** with live conditions
- **Hover effects** on buttons and cards
- **Smooth scrolling animations**

### **📱 Responsive Design**
- **Mobile-first approach** with Tailwind CSS
- **Responsive typography** and spacing
- **Adaptive grid layouts**
- **Touch-friendly navigation**

## 🛠️ **Technology Stack**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library
- **Headless UI** - Accessible components

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📂 **Project Structure**

```
alys-test/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main Alys Beach clone page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎨 **Design Features**

### **Color Scheme**
- **Primary**: Gray-900 (#111827)
- **Background**: White & Gray-50
- **Accent**: Beach gradient (Blue → Yellow)
- **Text**: Gray-700 for body, Gray-900 for headings

### **Typography**
- **Headings**: Light weight with wide letter spacing
- **Body**: Leading-relaxed for readability
- **Hierarchy**: Clear size differentiation

### **Animations**
- **Scroll-triggered** section reveals
- **Hover effects** on interactive elements
- **Smooth transitions** throughout
- **Pulse animations** for live indicators

## 📋 **Sections Included**

### **1. Hero Section**
- Large background with beach gradient
- "REAL ESTATE" and "THE BEAUTY OF HOME" titles
- Descriptive paragraph about Alys Beach community
- Animated scroll indicator

### **2. Why Alys**
- Three-column grid layout
- Architectural Excellence, Exclusive Community, Coastal Lifestyle
- Fade-in animations on scroll

### **3. The Process**
- Centered content with description
- Custom experience focus

### **4. Alys Insider Newsletter**
- Two-column layout (text + image placeholder)
- Newsletter subscription call-to-action
- Quarterly publication information

### **5. Fortified Construction**
- Image + text layout
- Construction company details
- Safety standards information

### **6. Somerset Program**
- Custom home design program
- Architect collaboration details
- "VIEW SOMERSET HOMES" button

### **7. Beach Club**
- Exclusive amenity description
- Three Gulf-front pools mention
- Restaurant and entertainment details

### **8. Owner Services**
- Comprehensive service overview
- Property inspection program
- 24-hour security mention

### **9. Interactive Widgets**
- **Newsletter Signup Form**: Fixed bottom-right
  - First Name, Last Name, Email fields
  - Interest selection dropdown
  - Comments textarea
  - Privacy policy notice

- **Live Beach Cam**: Fixed bottom-left
  - Simulated live feed display
  - Weather conditions (82°F, overcast)
  - Wind, humidity, pressure data
  - Animated live indicator

### **10. Footer**
- Four-column layout
- Contact information (850.213.5500, 850.213.5555)
- Address: 9581 County Hwy 30A East, Alys Beach, FL 32461
- Quick links, Policies, Social media
- Copyright notice

## 🔧 **Customization**

### **Colors**
Modify colors in `tailwind.config.js` or directly in component classes.

### **Content**
Update text content directly in `src/app/page.tsx`.

### **Images**
Replace placeholder divs with actual images in the image sections.

### **Animations**
Adjust Framer Motion settings in the motion components.

## 📱 **Responsive Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All sections adapt gracefully across devices with:
- Responsive grid layouts
- Scalable typography
- Touch-friendly buttons
- Optimized spacing

## 🌊 **Alys Beach Branding**

The clone maintains the sophisticated, coastal luxury aesthetic of the original:
- **Clean, minimal design**
- **High-end typography**
- **Elegant color palette**
- **Premium feel throughout**
- **Beach-themed elements**

## 🚀 **Performance**

- **Static generation** for fast loading
- **Optimized images** and assets
- **Minimal JavaScript bundle**
- **Efficient CSS** with Tailwind
- **Smooth animations** without jank

## 📄 **Original Website**

This clone replicates: [https://alysbeach.com/real-estate/](https://alysbeach.com/real-estate/)

---

**Note**: This is a demonstration clone created for educational purposes. All content and design elements are inspired by the original Alys Beach website.