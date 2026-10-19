import cloneStyles from "@/legacy/lib/generated/clone-styles.json";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {cloneStyles.map((href) => (
        <link key={href} rel="stylesheet" href={href} crossOrigin="" />
      ))}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="stylesheet" href="/phantom/inline.css" />
      <link rel="stylesheet" href="/phantom/clone-inline.css" />
      <link rel="stylesheet" href="/phantom/theme-polish.css" />
      {children}
      <div id="teleports" suppressHydrationWarning />
    </>
  );
}
