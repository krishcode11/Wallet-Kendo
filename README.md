# RadhaSphere Wallet

A modern Web3 wallet dashboard built with Next.js, React, and KendoReact components. This project was developed for the KendoReact Free Components Challenge.

![RadhaSphere Wallet](public/logos/radhasphere-dark.svg)

## Features

- **Modern UI Design**: Built with Material Design principles using KendoReact's Material Theme
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Interactive Dashboard**: Visualize portfolio data with charts and grids
- **Transaction Management**: Send and receive crypto with intuitive UI
- **NFT Support**: Upload and manage NFT collections
- **AI-Powered Insights**: Get recommendations and market analysis
- **Secure Settings**: Comprehensive security and preference management

## KendoReact Components Used

This project demonstrates the use of 12+ KendoReact Free Components:

1. **Buttons & ButtonGroup**: Used throughout the application for actions
2. **AppBar**: Main navigation header component
3. **Drawer**: Sidebar navigation on dashboard
4. **TabStrip**: Used in multiple pages for content organization
5. **PanelBar**: Used for expandable sections in Settings and Send/Receive
6. **Grid**: Displays transaction data and NFT collections
7. **Charts**: Portfolio visualization with line and pie charts
8. **Upload**: NFT image uploading functionality
9. **NumericTextBox**: Used in Send/Receive for token amounts
10. **DateRangePicker**: Filter data by date range in AI Insights
11. **DropDownList**: Token selection and settings options
12. **ProgressBar**: Portfolio completion and loading states

## Pages

1. **Login**: Authentication screen with form inputs
2. **Dashboard**: Portfolio summary and transaction overview
3. **Send/Receive**: Token transfer functionality
4. **NFT Gallery**: View and upload NFT assets
5. **AI Insights**: AI-based portfolio recommendations
6. **Settings**: User preferences and security settings

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/krishcode11/Wallet-Kendo
   ```

2. Install dependencies
   ```
   cd radhasphere-wallet
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Open [RadhaSphere Wallet](https://rswallet.netlify.app/) in your browser

## Project Structure

```
radhasphere-wallet/
├── app/
│   ├── components/        # Reusable UI components
│   ├── dashboard/         # Dashboard page
│   ├── send-receive/      # Send and receive tokens
│   ├── nft/               # NFT gallery
│   ├── ai-insights/       # AI insights
│   ├── settings/          # User settings
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Login page
├── public/                # Static assets
├── package.json           # Dependencies
└── README.md              # Documentation
```

## KendoReact ThemeBuilder Usage

This project uses the KendoReact Material Theme with custom color palette:

1. Primary color: #6a1b9a (Purple)
2. Secondary color: #3949ab (Indigo)

The theme was customized using Progress ThemeBuilder and exported to maintain consistent styling throughout the application.

## Deployment

The project is deployed on Netlify at https://rswallet.netlify.app/.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- KendoReact for providing the component library
- Progress for organizing the KendoReact Free Components Challenge
