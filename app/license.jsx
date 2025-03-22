import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "License",
    content: `
RadhaSphere Wallet is licensed under OmniRadhaNexus Technologies. 

✅ Usage — You’re granted a non-exclusive, non-transferable right to use the app.  
❌ Restrictions — No reverse engineering, redistribution, or commercial resale without permission.

All rights reserved © 2025 OmniRadhaNexus.
    `
  }
];

export default function LicensePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">License</h1>
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


