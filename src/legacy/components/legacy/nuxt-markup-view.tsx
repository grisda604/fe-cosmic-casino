"use client";

type NuxtMarkupViewProps = {
  html: string;
};

export function NuxtMarkupView({ html }: NuxtMarkupViewProps) {
  return (
    <div
      className="nuxt-markup-view"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
