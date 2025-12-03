'use client';

import { Typography } from '@/components/ui/typography';

export default function TestTypographyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Page Header */}
        <div className="mb-12 pb-8 border-b">
          <Typography variant="h1" align="center" className="text-foreground mb-4">
            Typography System Test
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground">
            Testing all typography variants with English and Arabic text
          </Typography>
        </div>

        {/* Display Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            Display Variant (Hero Headlines)
          </Typography>
          <Typography variant="display" className="text-foreground">
            Display Heading Text
          </Typography>
          <Typography variant="display" className="text-foreground">
            عنوان عرض كبير
          </Typography>
        </section>

        {/* H1 Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            H1 Variant (Page Titles)
          </Typography>
          <Typography variant="h1" className="text-foreground">
            H1 Heading - Page Title
          </Typography>
          <Typography variant="h1" className="text-foreground">
            عنوان الصفحة - H1
          </Typography>
        </section>

        {/* H2 Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            H2 Variant (Section Titles)
          </Typography>
          <Typography variant="h2" className="text-foreground">
            H2 Heading - Section Title
          </Typography>
          <Typography variant="h2" className="text-foreground">
            عنوان القسم - H2
          </Typography>
        </section>

        {/* H3 Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            H3 Variant (Subsection Titles)
          </Typography>
          <Typography variant="h3" className="text-foreground">
            H3 Heading - Subsection Title
          </Typography>
          <Typography variant="h3" className="text-foreground">
            عنوان القسم الفرعي - H3
          </Typography>
        </section>

        {/* H4 Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            H4 Variant (Card Headers)
          </Typography>
          <Typography variant="h4" className="text-foreground">
            H4 Heading - Card Header
          </Typography>
          <Typography variant="h4" className="text-foreground">
            رأس البطاقة - H4
          </Typography>
        </section>

        {/* Body Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            Body Variant (Paragraphs)
          </Typography>
          <Typography variant="body" className="text-foreground">
            This is body text. It should be readable and comfortable for long-form content. 
            The font will automatically switch to IBM Plex Sans Arabic when the locale is Arabic.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body" className="text-foreground">
            هذا نص أساسي للفقرة. يجب أن يكون مقروءًا ومريحًا للمحتوى الطويل. 
            سيتم استخدام خط IBM Plex Sans Arabic تلقائيًا للنص العربي.
            وهذا يضمن تجربة قراءة ممتازة باللغة العربية.
          </Typography>
        </section>

        {/* Subtitle Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            Subtitle Variant (Supporting Text)
          </Typography>
          <Typography variant="subtitle" className="text-muted-foreground">
            This is subtitle text. Used for supporting headlines and introductions.
          </Typography>
          <Typography variant="subtitle" className="text-muted-foreground">
            هذا نص فرعي. يُستخدم للعناوين الداعمة والمقدمات.
          </Typography>
        </section>

        {/* Caption Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            Caption Variant (Small Text)
          </Typography>
          <Typography variant="caption" className="text-muted-foreground">
            This is caption text. Used for metadata, labels, and fine print. Small but readable.
          </Typography>
          <Typography variant="caption" className="text-muted-foreground">
            هذا نص تسمية توضيحية. يُستخدم للبيانات الوصفية والتسميات والنص الصغير.
          </Typography>
        </section>

        {/* Button Variant */}
        <section className="mb-12 space-y-6">
          <Typography variant="overline" className="text-accent">
            Button Variant (CTA Text)
          </Typography>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Typography variant="button">Get Started</Typography>
            </button>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Typography variant="button">ابدأ الآن</Typography>
            </button>
            <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
              <Typography variant="button">Learn More</Typography>
            </button>
          </div>
        </section>

        {/* Overline Variant */}
        <section className="mb-12 space-y-4">
          <Typography variant="overline" className="text-accent">
            Overline Variant (Category Labels)
          </Typography>
          <Typography variant="overline" className="text-accent">
            Features
          </Typography>
          <Typography variant="overline" className="text-accent">
            المميزات
          </Typography>
        </section>

        {/* Text Alignment */}
        <section className="mb-12 space-y-6">
          <Typography variant="overline" className="text-accent">
            Text Alignment Options
          </Typography>
          <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
            <Typography variant="body" align="left" className="text-foreground">
              Left aligned text (default)
            </Typography>
            <Typography variant="body" align="center" className="text-foreground">
              Center aligned text
            </Typography>
            <Typography variant="body" align="right" className="text-foreground">
              Right aligned text
            </Typography>
          </div>
        </section>

        {/* Responsive Test */}
        <section className="mb-12 space-y-6">
          <Typography variant="overline" className="text-accent">
            Responsive Sizing Test
          </Typography>
          <div className="p-6 bg-muted/30 rounded-lg space-y-4">
            <Typography variant="body" className="text-muted-foreground">
              Resize your browser window to see text scale responsively across breakpoints (base → md → lg)
            </Typography>
            <Typography variant="display" className="text-foreground">
              Responsive Display
            </Typography>
            <Typography variant="h1" className="text-foreground">
              Responsive H1
            </Typography>
            <Typography variant="body" className="text-foreground">
              Responsive body text that adapts to screen size
            </Typography>
          </div>
        </section>

        {/* Font Assignment Summary */}
        <section className="mb-12">
          <Typography variant="overline" className="text-accent mb-4">
            Font Assignment Reference
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <Typography variant="h4" className="text-foreground mb-4">
                Alarabia Custom Font
              </Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Used for: display, h1, h2, h3, h4
              </Typography>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <Typography variant="h4" className="text-foreground mb-4">
                IBM Plex Sans Arabic
              </Typography>
              <Typography variant="caption" className="text-muted-foreground">
                Used for: body, subtitle, caption, overline, button
              </Typography>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
