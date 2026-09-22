import { Fragment } from "react";

export default function BrandName() {
  return <span className="inline-brand-name">Magpie</span>;
}
export function BrandText({ text }: { text: string }) {
  return <>{text.split(/(Magpie)/).map((part, i) => part === "Magpie" ? <BrandName key={i} /> : <Fragment key={i}>{part}</Fragment>)}</>;
}
