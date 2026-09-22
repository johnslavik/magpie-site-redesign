import { Fragment } from "react";
import { withBase } from "@/ui/lib/utils";

export default function BrandName() {
  return <img className="inline-wordmark" src={withBase("/wordmark.svg")} alt="Magpie" width="497" height="140" />;
}
export function BrandText({ text }: { text: string }) {
  return <>{text.split(/(Magpie)/).map((part, i) => part === "Magpie" ? <BrandName key={i} /> : <Fragment key={i}>{part}</Fragment>)}</>;
}
