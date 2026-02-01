import { Card, CardContent } from "@/components/ui/card";

const languages = [
  { country: "us", name: "English", code: "EN" },
  { country: "in", name: "தமிழ்", code: "TA" },
  { country: "in", name: "हिन्दी", code: "HI" },
  { country: "es", name: "Español", code: "ES" },
  { country: "fr", name: "Français", code: "FR" },
  { country: "de", name: "Deutsch", code: "DE" },
  { country: "it", name: "Italiano", code: "IT" },
  { country: "pt", name: "Português", code: "PT" },
  { country: "ru", name: "Русский", code: "RU" },
  { country: "jp", name: "日本語", code: "JA" },
  { country: "kr", name: "한국어", code: "KO" },
  { country: "cn", name: "中文", code: "ZH" },
  { country: "sa", name: "العربية", code: "AR" },
  { country: "in", name: "മലയാളം", code: "ML" },
  { country: "in", name: "తెలుగు", code: "TE" },
  { country: "in", name: "ಕನ್ನಡ", code: "KN" },
];

const regions = [
  { name: "Europe", count: "6 Languages", languages: "🇪🇸 Spanish, 🇫🇷 French, 🇩🇪 German, 🇮🇹 Italian, 🇵🇹 Portuguese, and 🇷🇺 Russian" },
  { name: "Asia", count: "4 Languages", languages: "🇨🇳 Chinese, 🇯🇵 Japanese, 🇰🇷 Korean, and 🇸🇦 Arabic" },
  { name: "India", count: "5 Languages", languages: "🇮🇳 Hindi, 🇮🇳 Tamil, 🇮🇳 Malayalam, 🇮🇳 Telugu, and 🇮🇳 Kannada" },
  { name: "Americas", count: "1 Language", languages: "🇺🇸 English - serving global communication" },
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
                className="bg-card border rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-110 transition-transform bg-white">
                  <img
                    src={`https://flagcdn.com/w80/${lang.country}.png`}
                    alt={`${lang.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold block">{lang.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{lang.code}</span>
                </div>
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
