import { Card, CardContent } from "@/components/ui/card";

const languages = [
  { flag: "🇺🇸", name: "English", code: "EN" },
  { flag: "🇮🇳", name: "தமிழ்", code: "TA" },
  { flag: "🇮🇳", name: "हिन्दी", code: "HI" },
  { flag: "🇪🇸", name: "Español", code: "ES" },
  { flag: "🇫🇷", name: "Français", code: "FR" },
  { flag: "🇩🇪", name: "Deutsch", code: "DE" },
  { flag: "🇮🇹", name: "Italiano", code: "IT" },
  { flag: "🇵🇹", name: "Português", code: "PT" },
  { flag: "🇷🇺", name: "Русский", code: "RU" },
  { flag: "🇯🇵", name: "日本語", code: "JA" },
  { flag: "🇰🇷", name: "한국어", code: "KO" },
  { flag: "🇨🇳", name: "中文", code: "ZH" },
  { flag: "🇸🇦", name: "العربية", code: "AR" },
  { flag: "🇮🇳", name: "മലയാളം", code: "ML" },
  { flag: "🇮🇳", name: "తెలుగు", code: "TE" },
  { flag: "🇮🇳", name: "ಕನ್ನಡ", code: "KN" },
];

const regions = [
  { name: "Europe", count: "6 Languages", languages: "Spanish, French, German, Italian, Portuguese, and Russian" },
  { name: "Asia", count: "4 Languages", languages: "Chinese, Japanese, Korean, and Arabic" },
  { name: "India", count: "5 Languages", languages: "Hindi, Tamil, Malayalam, Telugu, and Kannada" },
  { name: "Americas", count: "1 Language", languages: "English - serving global communication" },
];

const Languages = () => {
  return (
    <section id="languages" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Language Support</h2>
          <p className="text-xl text-muted-foreground">Break Down Language Barriers</p>
          <p className="text-muted-foreground mt-2">
            Our AI understands and summarizes content in 16 languages. Get insights from global websites, research papers, and international news sources.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-center">Supported Languages</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2 block">{lang.flag}</span>
                <span className="text-xs font-medium block truncate">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.code}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {regions.map((region, index) => (
            <Card key={index} className="border-0 bg-muted/50">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-primary mb-1">{region.name}</h4>
                <p className="text-sm font-medium mb-2">{region.count}</p>
                <p className="text-xs text-muted-foreground">{region.languages}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
