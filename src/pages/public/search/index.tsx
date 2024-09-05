import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useQuery } from '@tanstack/react-query';
import { fetchTrainers } from '@/api/page';
import React from 'react';
import { ProfilePersonalCard } from './profile-personal-card';

export const Search = () => {

  const { data, isPending, isError } = useQuery({
    queryKey: ['trainers'],
    queryFn: fetchTrainers,
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="relative w-full h-full">
      {/* Background circles */}
      <div className="circle modal-top-left"></div>
      <div className="circle modal-bottom-right top-1/2 right-0"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Layout>
          <div className="mx-auto flex flex-col gap-8 w-fit">
            <h1 className="text-center text-6xl font-bold text-secondary">Encontre seu treinador</h1>
            <div className="rounded-full bg-tertiary-foreground border border-primary relative">
              <input
                type="text"
                placeholder="Qual é o nome ou modalidade do treinador?"
                className="w-full h-12 pl-4 rounded-full bg-tertiary-foreground focus:outline-none"
              />
              <Button className="absolute right-1 top-1 w-32 bg-primary rounded-full">
                Buscar
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-24 items-centeri flex-grow px-32">
            {isPending ? (
              <p>Carregando...</p>
            ) :
              isError ? (
                <p>Sem resultados</p>
              ) :
                (
                  <>
                    {
                      data.map((trainer) => (
                        <ProfilePersonalCard key={trainer.url} page={trainer} />
                      ))
                    }
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </>
                )}
          </div>
        </Layout>
      </div>
    </div>
  );
};
