import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TestPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Theme Test Page</h1>

      {/* Brand Color Swatches */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-50 border"></div>
            <span className="text-xs mt-1 block">50</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-100 border"></div>
            <span className="text-xs mt-1 block">100</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-200 border"></div>
            <span className="text-xs mt-1 block">200</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-300 border"></div>
            <span className="text-xs mt-1 block">300</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-400 border"></div>
            <span className="text-xs mt-1 block">400</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-500 border"></div>
            <span className="text-xs mt-1 block">500</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-600 border"></div>
            <span className="text-xs mt-1 block">600</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-700 border"></div>
            <span className="text-xs mt-1 block">700</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-800 border"></div>
            <span className="text-xs mt-1 block">800</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-900 border"></div>
            <span className="text-xs mt-1 block">900</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-950 border"></div>
            <span className="text-xs mt-1 block">950</span>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-5xl font-extrabold">Heading 1 - Plus Jakarta Sans</h1>
            <p className="text-sm text-muted-foreground mt-1">text-5xl / ExtraBold</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Heading 2 - Plus Jakarta Sans</h2>
            <p className="text-sm text-muted-foreground mt-1">text-4xl / Bold</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">Heading 3 - Plus Jakarta Sans</h3>
            <p className="text-sm text-muted-foreground mt-1">text-3xl / Bold</p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Heading 4 - Plus Jakarta Sans</h4>
            <p className="text-sm text-muted-foreground mt-1">text-2xl / SemiBold</p>
          </div>
          <div>
            <h5 className="text-xl font-semibold">Heading 5 - Plus Jakarta Sans</h5>
            <p className="text-sm text-muted-foreground mt-1">text-xl / SemiBold</p>
          </div>
          <div>
            <h6 className="text-lg font-semibold">Heading 6 - Plus Jakarta Sans</h6>
            <p className="text-sm text-muted-foreground mt-1">text-lg / SemiBold</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Body Text - Source Sans 3</h3>
          <p className="text-base">
            This is body text using Source Sans 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Journal Text - Source Serif 4</h3>
          <p className="font-serif text-lg">
            This is journal-style text using Source Serif 4. Perfect for long-form reading. The serif font provides excellent readability for extended content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Code - JetBrains Mono</h3>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
{`const greeting = "Hello, World!";
function greet(name: string) {
  return \`\${greeting} Welcome, \${name}!\`;
}`}
          </pre>
        </div>
      </section>

      {/* UI Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">UI Components</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Buttons</h3>
            <div className="flex gap-3 flex-wrap">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Badges</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Cards</h3>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is card content with the configured theme colors. The card uses surface background with proper contrast.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Light/Dark Mode Test */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border bg-background">
            <p className="font-medium">Background</p>
            <p className="text-sm text-muted-foreground">#FAFAFA / #0B1120</p>
          </div>
          <div className="p-4 rounded-lg border bg-surface">
            <p className="font-medium">Surface</p>
            <p className="text-sm text-muted-foreground">#FFFFFF / #131C2E</p>
          </div>
          <div className="p-4 rounded-lg border bg-primary text-primary-foreground">
            <p className="font-medium">Primary</p>
            <p className="text-sm opacity-80">#0D9488 / #14B8A6</p>
          </div>
          <div className="p-4 rounded-lg border bg-accent text-accent-foreground">
            <p className="font-medium">Accent</p>
            <p className="text-sm opacity-80">#CCFBF1 / #134E4A</p>
          </div>
        </div>
      </section>
    </div>
  )
}
