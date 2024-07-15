import { TCreatePage } from '@/@types/page';
import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPage } from '@/features/page/create-page';
import { urlAvailabilityPage } from '@/features/page/url-availability-page';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { useLoading } from '@/hooks/use-loading.hook';
import { signupPageReducer } from '@/reducers/signup-page';
import {
  triggerUrlSuggestion,
  updatePageName,
  updatePageUrl,
} from '@/reducers/signup-page/actions';
import { pageNameInitState } from '@/utils/constants/signup-page-reducer.constants';
import { BadgeCheck } from 'lucide-react';
import { useEffect, useReducer, useRef } from 'react';
import { useSubmitionOutput } from './hooks/use-form-submition';
import { useNavigate } from 'react-router-dom';

export const PageInfo = () => {
  // @reducers
  const [state, dispatch] = useReducer(signupPageReducer, pageNameInitState);
  const appDispatch = useAppDispatch();
  const page = useAppSelector((state) => state.page);
  const user = useAppSelector((state) => state.user);

  const { formTriggered, isResponseWithNoErrors, isLoading: isLoadingForm } =
    useSubmitionOutput(page.request.error, page.request.loading);

  // @hooks
  const { isLoading, setIsLoading } = useLoading(page.request.loading);
  const isPageAvailable = page.page.url && !isLoading;
  const navigate = useNavigate();

  const timeout = useRef<NodeJS.Timeout>();
  // @handlers
  const handleUrlAvailability = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (state.url) {
        appDispatch(urlAvailabilityPage({ page_url: state.url }));
        setIsLoading(true);
      }
    }, 300);
  };

  const handlePageCreation = (object: TCreatePage) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (state.url) {
        appDispatch(createPage(object));
        setIsLoading(true);
      }
    }, 1500);
  }

  // @effects
  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    if (state.url) {
      handleUrlAvailability();
    }
  }, [state.url]);

  useEffect(() => {
    if (isResponseWithNoErrors) {
      navigate('/u/page/edit');
    }
  }, [isResponseWithNoErrors]);

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
            user_id: user.user.id,
            page_name: formData.get('page-name') as string,
            url: formData.get('page-url') as string,
          };
          console.log(obj);
          formTriggered(true);
          handlePageCreation(obj);
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
            {isPageAvailable ? (
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
            disabled={!isPageAvailable}
          >
            {isLoadingForm ? 'Carregando...' : 'Criar página'}
          </Button>
        </div>
      </form>
    </div >
  );
};
