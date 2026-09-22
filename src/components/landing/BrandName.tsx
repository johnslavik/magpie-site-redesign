import { Fragment } from "react";
import { withBase } from "@/ui/lib/utils";

export default function BrandName({ logo = false }: { logo?: boolean }) {
  return logo ? <img className="inline-wordmark" src={withBase("/wordmark.svg")} alt="Magpie" width="497" height="140" /> : <strong className="brand-name">Magpie</strong>;
}
export function BrandText({ text }: { text: string }) {
  return <>{text.split(/(Magpie)/).map((part, i) => part === "Magpie" ? <BrandName key={i} /> : <Fragment key={i}>{part}</Fragment>)}</>;
}
