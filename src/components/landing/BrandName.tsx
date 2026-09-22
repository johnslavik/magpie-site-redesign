import { Fragment } from "react";

export default function BrandName() {
  return <img className="inline-wordmark" src="/wordmark.svg" alt="Magpie" width="158" height="45" />;
}
export function BrandText({ text }: { text: string }) {
  return <>{text.split(/(Magpie)/).map((part, i) => part === "Magpie" ? <BrandName key={i} /> : <Fragment key={i}>{part}</Fragment>)}</>;
}
