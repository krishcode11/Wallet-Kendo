import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Terms of Service",
    content: `
By using RadhaSphere Wallet, you agree to:

1️⃣ Self-custody responsibility — You are fully responsible for safeguarding your wallet, private keys, and assets.  
2️⃣ Compliance — You agree not to use the wallet for illegal activities.  
3️⃣ No liability — OmniRadhaNexus is not responsible for any loss of funds due to user error, hacks, or third-party vulnerabilities.

We may update terms without prior notice. Continued use means acceptance of updated terms.
    `
  }
];

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
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
