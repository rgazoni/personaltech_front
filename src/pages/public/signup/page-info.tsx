import { createPage, urlAvailabilityPage } from '@/api/page';
import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast.hook';
import { signupPageReducer } from '@/reducers/signup-page';
import {
  triggerUrlSuggestion,
  updatePageName,
  updatePageUrl,
} from '@/reducers/signup-page/signup-page.actions';
import useAppStore from '@/store';
import { pageNameInitState } from '@/utils/constants/signup-page-reducer.constants';
import { useMutation } from '@tanstack/react-query';
import { BadgeCheck } from 'lucide-react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PageInfo = () => {
  const user = useAppStore((state) => state.user);
  const updatePartial = useAppStore((state) => state.updatePartialPage);

  // @states
  const [isUrlAvailable, setIsUrlAvailable] = useState<boolean>(false);

  // @reducers
  const [state, dispatch] = useReducer(signupPageReducer, pageNameInitState);

  // @hooks
  const { notify } = useToast();
  const navigate = useNavigate();
  const mutation_url = useMutation({
    mutationKey: ['page/url-availability', { page_url: state.url }],
    mutationFn: urlAvailabilityPage,
    onSuccess: (data) => {
      setIsUrlAvailable(data.status === 'available');
    },
  });
  const mutation_create = useMutation({
    mutationKey: ['page/create', { page_url: state.url }],
    mutationFn: createPage,
    onSuccess: (data) => {
      notify('success', '🏋️ Página criada com sucesso!');
      updatePartial(data);
      navigate('/page/edit/form');
    },
    onError: (error) => {
      notify('error', 'Erro ao criar página, tente novamente mais tarde!');
      console.error(error);
    },
  });

  // @references
  const timeout = useRef<NodeJS.Timeout>();
  // @handlers
  const handleUrlAvailability = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (state.url) {
        mutation_url.mutate(state.url);
      }
    }, 300);
  };

  // @effects
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    if (state.url) {
      handleUrlAvailability();
    }
  }, [state.url]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">
        Nome da sua página 🤸
      </h1>
      <form
        className="mt-7 flex flex-col gap-6"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            user_id: user.id,
            page_name: formData.get('page-name') as string,
            url: formData.get('page-url') as string,
          };
          mutation_create.mutate(obj);
        }}
      >
        <div className="mt-5">
          <LabeledInput
            id="page-name"
            label="Qual será o nome da sua página?"
            type="text"
            name="page-name"
            value={state.page_name}
            onChange={(e) => dispatch(updatePageName(e.target.value))}
            onBlur={() => {
              dispatch(triggerUrlSuggestion());
            }}
          />
        </div>

        <div className="mt-1 flex flex-col gap-2">
          <Label className="font-light text-tertiary">
            Qual será a sua URL?
          </Label>
          <div className="flex items-center gap-3">
            <Label className="italic text-secondary">personaltech.com/p/</Label>
            <Input
              type="text"
              name="page-url"
              id="page-url"
              defaultValue={state.url}
              onChange={(e) => {
                dispatch(updatePageUrl(e.target.value));
              }}
            />
            {isUrlAvailable ? (
              <BadgeCheck size={40} className="text-silver-tree-400" />
            ) : (
              <BadgeCheck size={40} className="text-muted" />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Button
            className="mx-auto mt-10 w-4/6 rounded-full py-6"
            type="submit"
            disabled={!isUrlAvailable}
          >
            {mutation_create.isPending ? 'Carregando...' : 'Criar página'}
          </Button>
        </div>
      </form>
    </div>
  );
};
