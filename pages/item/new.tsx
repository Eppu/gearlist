import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Row, Input, Spacer, Loading } from '@nextui-org/react';
import { Layout } from '../../components/Layout';
import debounce from 'lodash.debounce';

type Inputs = {
  //   example: string;
  brand: string;
  model: string;
};

type SearchResult = {
  brand: string;
  model: string;
  id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};

export default function NewItem() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //   console.log(watch('brand')); // watch input value by passing the name of it

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchBrand = async (brand: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/items/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: brand }),
    });

    const data = await res.json();

    if (!data) {
      setIsLoading(false);
      return;
    }

    console.log(`got data with query ${brand}`, data);
    setIsLoading(false);
    setSearchResults(data.items);

    // return data;
    return;
  };

  const debouncedSearchBrand = debounce(searchBrand, 500);

  return (
    <Layout>
      <Container css={{ mt: '$20' }}>
        {isLoading && <Loading />}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Input
            clearable
            bordered
            labelPlaceholder="Search for an item"
            // value={brand}
            onChange={(e) => debouncedSearchBrand(e.target.value)}
          />
          <Spacer y={1} />
          {/*  if there are search results, display them */}
          {searchResults && searchResults.length > 0 && (
            <Container css={{ p: '$0' }}>
              {searchResults.map((result) => (
                <Row
                  key={result.id}
                  onClick={(e) => setSelectedTemplate(result.id)}
                >
                  <a>
                    {result.brand} {result.model}
                  </a>
                  <Spacer y={2} />
                </Row>
              ))}
            </Container>
          )}

          <input type="submit" />
        </form>
      </Container>
    </Layout>
  );
}
