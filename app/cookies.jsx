import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Cookies Policy",
    content: `
This website uses cookies to enhance your experience. By continuing to use our site, you agree to our cookie policy.

🍪 Essential cookies — These are necessary for the website to function properly.
🍪 Analytics cookies — Help us understand how visitors use the site.

You can adjust your cookie preferences in your browser settings.

For more details, contact us at yourcreationpublication@gmail.com.
    `
  }
];

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Cookies Policy</h1>
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




