import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Privacy Policy",
    content: `
RadhaSphere Wallet, developed by OmniRadhaNexus, respects your privacy. 
We collect only essential user data required to improve our services, such as wallet addresses, usage patterns, and device info.

✅ We do not sell your data.  
✅ We may use third-party services like Web3Auth, Biconomy, or analytics tools, all compliant with global data regulations (GDPR, CCPA).  
✅ You control your personal information and can request deletion anytime.

For full details, contact us at yourcreationpublication@gmail.com.
    `
  }
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
      {sections.map((section, index) => (
        <Card key={index} className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <p className="text-sm text-gray-600">{section.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


