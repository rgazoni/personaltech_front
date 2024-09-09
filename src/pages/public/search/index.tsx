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
} from '@/components/ui/pagination';
import { useMutation } from '@tanstack/react-query';
import { GetPage, fetchPersonalSearch } from '@/api/page';
import React, { useEffect, useState } from 'react';
import { ProfilePersonalCard } from './profile-personal-card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, X } from 'lucide-react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { fetchCities } from '@/api/generic';
import { expertisesOpts } from '@/pages/private/edit-personal-page/form/expertises-opts';

const DropdownUnique = ({
  title,
  data,
  onSelect,
  defaultSelected,
}: {
  title: string;
  data: { id: string; label: string }[];
  onSelect?: (category: string) => void;
  defaultSelected?: string;
}) => {
  // State to track selected item (only one item can be selected)
  const [selectedItem, setSelectedItem] = useState<string | null>(
    defaultSelected || null
  );

  // Handle item selection
  const handleSelect = (id: string) => {
    const newSelectedItem = selectedItem === id ? null : id; // Toggle selection

    setSelectedItem(newSelectedItem);

    if (onSelect && newSelectedItem) {
      onSelect(newSelectedItem); // Call onSelect with the selected category
    }
    if (onSelect && !newSelectedItem) {
      onSelect(''); // Call onSelect with the selected
    };
  }

  // Get the label of the selected item
  const selectedLabel = selectedItem
    ? data.find((item) => item.id === selectedItem)?.label
    : title;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1 rounded-full">
          <span>{selectedLabel}</span> {/* Display selected item label */}
          <ChevronDownIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="start" >
        {data.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={selectedItem === item.id} // Show checked status for the selected item
            onCheckedChange={() => handleSelect(item.id)} // Handle selection
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownSelectionCategories = ({
  title,
  data,
  setSelectedItems,
  selectedItems
}: {
  title: string;
  data: { id: string; label: string }[];
  setSelectedItems: (categories: string[]) => void;
  selectedItems: string[];
}) => {
  // State to track selected items

  // Handle item selection
  const handleSelect = (id: string) => {
    const updatedSelection = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];

    setSelectedItems(updatedSelection);

  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1 rounded-full">
          <span>{title}</span>
          <ChevronDownIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="start">
        {data.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.id}
            checked={selectedItems.includes(item.label)} // Show checked status
            onCheckedChange={() => handleSelect(item.label)} // Handle selection
          >
            <div className="flex items-center gap-2">
              {item.label}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ComboboxCity = ({
  setSelectedCity,
  selectedCity
}: {
  setSelectedCity?: (city: string) => void;
  selectedCity?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);

  // Debouncing the input to avoid frequent API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      mutate.mutate();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const mutate = useMutation({
    mutationFn: () => fetchCities(searchTerm),
    mutationKey: ['cities', searchTerm],
    onSuccess: (data) => {
      setCities(data);
    },
  });

  const handleSelectCity = (cityName: string) => {
    if (selectedCity === cityName) {
      setSelectedCity?.(''); // Unselect the city if it's already selected
    } else {
      setSelectedCity?.(cityName);
    }
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 rounded-full"
        >
          <span>{selectedCity || 'Cidade'}</span>
          <ChevronDownIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Procurar cidade..."
            value={searchTerm}
            onValueChange={(value: string) => setSearchTerm(value)}
          />
          <CommandList>
            {searchTerm === '' ? (
              <CommandEmpty className='text-muted text-center text-sm py-10'>Digite ao mínimo 3 letras para procurar</CommandEmpty>
            ) :
              mutate.isPending ? (
                <CommandEmpty>Loading cities...</CommandEmpty>
              ) : cities.length === 0 ? (
                <CommandEmpty className='text-muted text-center text-sm py-10'>Cidade não encontrada</CommandEmpty>
              ) : (
                <CommandGroup>
                  {cities.map((city: any) => (
                    <CommandItem
                      key={city.id}
                      value={city.nome}
                      onSelect={() =>
                        handleSelectCity(
                          city.nome + ' - ' + city.microrregiao.mesorregiao.UF.sigla
                        )
                      }
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedCity ===
                            city.nome +
                            ' - ' +
                            city.microrregiao.mesorregiao.UF.sigla
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {city.nome} - {city.microrregiao.mesorregiao.UF.sigla}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


export const Search = () => {
  //TODO already here when select a city
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('most_popular');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [pages, setPages] = useState<GetPage[]>([]);

  const mutateSearch = useMutation({
    mutationFn: ({ ex, name, state, city, rate, gender }: {
      ex?: string[],
      name?: string,
      state?: string,
      city?: string,
      rate?: string,
      gender?: string
    }) => fetchPersonalSearch(
      ex,
      name,
      state,
      city,
      rate,
      gender
    ),
    mutationKey: ['trainers', selectedCategories, name],
    gcTime: 1000 * 60 * 60,
    onSuccess: (data) => {
      setPages(data);
    },
  });

  React.useEffect(() => {
    console.log('Selected filters:');
    console.log(selectedCity);
    console.log(selectedCategories);
    console.log(selectedRating);
    console.log(selectedGender);
  }, [selectedCity, selectedCategories, selectedRating, selectedGender]);

  React.useEffect(() => {
    mutateSearch.mutate({
      ex: selectedCategories,
      city: selectedCity.split(' - ')[0],
      state: selectedCity.split(' - ')[1],
      rate: selectedRating,
      gender: selectedGender,
    });
  }, [selectedCategories, selectedCity, selectedRating, selectedGender]);

  return (
    <div className="relative h-full w-full">
      {/* Background circles */}
      <div className="circle modal-top-left"></div>
      <div className="circle modal-bottom-right right-0 top-1/2"></div>

      {/* Main content */}
      <div className="relative z-10">
        <Layout>
          <div className="mx-auto flex w-fit flex-col gap-3">
            <div className="mx-auto flex w-fit flex-col gap-8">
              <h1 className="text-center text-6xl font-bold text-secondary">
                Encontre seu treinador
              </h1>
              <div className="relative rounded-full border border-primary bg-tertiary-foreground">
                <input
                  type="text"
                  placeholder="Qual é o nome do treinador ou acessoria?"
                  className="h-12 w-full rounded-full bg-tertiary-foreground pl-4 focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      mutateSearch.mutate({
                        name: '',
                        ex: selectedCategories,
                        city: selectedCity.split(' - ')[0],
                        state: selectedCity.split(' - ')[1],
                        rate: selectedRating,
                        gender: selectedGender,
                      });
                    }
                  }}
                />
                <Button className="absolute right-1 top-1 w-32 rounded-full bg-primary"
                  onClick={() => {
                    mutateSearch.mutate({
                      name: name || '',
                      ex: selectedCategories,
                      city: selectedCity.split(' - ')[0],
                      state: selectedCity.split(' - ')[1],
                      rate: selectedRating,
                      gender: selectedGender,
                    });
                  }}
                >
                  Buscar
                </Button>
              </div>
            </div>
            <div className="mx-auto flex gap-3">
              <DropdownSelectionCategories
                title="Categorias"
                data={expertisesOpts}
                setSelectedItems={setSelectedCategories}
                selectedItems={selectedCategories}
              />
              <ComboboxCity
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
              <DropdownUnique
                title="Avaliação"
                defaultSelected="most_popular"
                data={[
                  { id: 'most_popular', label: 'Mais populares' },
                  { id: 'highest_rating', label: 'Melhor avaliação' },
                  { id: 'lowest_price', label: 'Menor preço' },
                ]}
                onSelect={setSelectedRating}
              />
              <DropdownUnique
                title="Gênero"
                data={[
                  { id: 'M', label: 'Masculino' },
                  { id: 'F', label: 'Feminino' },
                ]}
                onSelect={setSelectedGender}
              />
            </div>
          </div>

          <div className='mt-8 flex gap-3 py-4 px-5 items-center flex-wrap max-w-[800px] mx-auto'>
            {selectedCategories.length > 0 && (
              <>
                <div>
                  <h2 className='text-xs text-secondary font-light'>Filtros selecionados:</h2>
                </div>
                <div className='flex gap-2 flex-wrap'>
                  {selectedCategories.map((category) => (
                    <div key={category} className='rounded-full bg-muted-foreground w-fit px-2 flex gap-1 py-1'>
                      <span key={category} className='text-xs text-white text-nowrap'>{category}</span>
                      <X size={16} className='text-white cursor-pointer'
                        onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="items-centeri mt-12 flex flex-grow flex-col gap-8 px-32">
            {mutateSearch.isError ? (
              <p>Sem resultados</p>
            ) : (
              <>
                {pages.map((trainer) => (
                  <ProfilePersonalCard key={trainer.url} page={trainer} />
                ))}
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
