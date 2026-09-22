import { Fragment } from "react";

export default function BrandName() {
  return <span className="inline-wordmark" role="img" aria-label="Magpie" />;
}
export function BrandText({ text }: { text: string }) {
  return <>{text.split(/(Magpie)/).map((part, i) => part === "Magpie" ? <BrandName key={i} /> : <Fragment key={i}>{part}</Fragment>)}</>;
}
