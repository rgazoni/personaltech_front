import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NaturalLisense } from "./lisense-types/natural-lisense";
import { LegalLisense } from "./lisense-types/legal-lisense";
import { TriangleAlert } from "lucide-react";

export const LisenseInfo = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">Licença</h1>

      <div className="flex gap-2 text-sm font-light text-tertiary items-center mt-2">
        <TriangleAlert size={16} className="text-muted" />
        <p className="text-muted">
          Seu CREF será analisado e validado por nossa equipe.
        </p>
      </div>

      <Tabs defaultValue="natural" className="mt-8 flex flex-col items-center">
        <TabsList className="w-fit bg-secondary-foreground">
          <TabsTrigger value="natural" >Pessoa Física</TabsTrigger>
          <TabsTrigger value="legal">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="natural" >
          <NaturalLisense />
        </TabsContent>
        <TabsContent value="legal">
          <LegalLisense />
        </TabsContent>
      </Tabs>
    </div>
  );
};
