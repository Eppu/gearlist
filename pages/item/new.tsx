import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Row, Input, Spacer, Loading, Text, Card, Button } from '@nextui-org/react';
import { Layout } from '../../components/Layout';
import debounce from 'lodash.debounce';
import Dropzone from 'react-dropzone';
import { useSession } from 'next-auth/react';
// import { supabase } from '../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

type Inputs = {
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

enum Category {
  CAMERA = 'Camera',
  LENS = 'Lens',
  ACCESSORY = 'Accessory',
  BAG = 'Bag',
}

export default function NewItem() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { data: session, status } = useSession();

  //   console.log(watch('brand')); // watch input value by passing the name of it

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({} as SearchResult);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchBrand = async (brand: string) => {
    if (brand.length === 0) {
      setSearchTerm('');
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setSearchTerm(brand);
    const data = await fetch(`/api/items/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: brand }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            setError('You are not authorized to access this resource. Try logging in again.');
          } else {
            setError('Something went wrong. Try again in a few minutes!');
          }
        }
        return res.json();
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        return;
      });

    if (!data) {
      setIsLoading(false);
      return;
    }

    console.log(`got data with query ${brand}`, data);
    setIsLoading(false);
    setSearchResults(data.items);
    return;
  };

  const handleAddItem = async () => {
    if (!selectedTemplate) {
      setError('No template selected.');
      return;
    }
    console.log('adding item', selectedTemplate);

    const data = await fetch(`/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTemplate),
    }).then((res) => {
      if (!res.ok) {
        setError('Something went wrong. Try again in a few minutes!');
      }
      console.log('created a new item: ', data);
      return res.json();
    });
  };

  const debouncedSearchBrand = debounce(searchBrand, 500);

  const handleImageUpload = async (acceptedFiles: File[]) => {
    if (!session || !session.supabaseAccessToken) {
      setError('You are not authorized to access this resource. Try logging in again.');
      return;
    }

    // TODO: Refactor this. The client should be created once and then reused, but I'm not sure how to do that since it needs the session for the authorization header.
    // Also, it would be neater to move this to an API route.
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${session.supabaseAccessToken}`,
        },
      },
    });
    console.log('acceptedFiles', acceptedFiles);
    const file = acceptedFiles[0];
    const { data, error } = await supabase.storage.from('user-uploads').upload(`item-${selectedTemplateId}.jpg`, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.log('error', error);
      return;
    }
    console.log('data', data);
  };

  return (
    <Layout>
      <Container css={{ mt: '$20' }}>
        <Text h1>Add gear</Text>
        <Card css={{ p: '$16 0' }}>
          <Container
          // css={{ p: '$15 $10' }}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <Input
              clearable
              bordered
              size={'lg'}
              fullWidth
              labelPlaceholder="Search for an item"
              contentRight={isLoading ? <Loading size="xs" /> : null}
              onChange={(e) => {
                debouncedSearchBrand(e.target.value);
              }}
            />
            {(error || (searchResults && searchResults.length !== 0)) && <Spacer y={1} />}
            {error && <p>{error}</p>}
            {!isLoading && searchTerm && searchResults && searchResults.length === 0 && (
              <p>No results found for {searchTerm}</p>
            )}
            {/* </Row> */}
          </Container>
          <Container>
            {/* display search results */}
            {searchResults && searchResults.length > 0 && (
              <Container css={{ p: '$0' }}>
                {searchResults.map((result) => (
                  <Row key={result.id} onClick={(e) => setSelectedTemplateId(result.id)}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        // set the template object to state so we can use it in the next step
                        console.log('selectedTemplate', selectedTemplate);
                        setSelectedTemplate(result);
                        setSearchTerm('');
                        setSearchResults([]);
                        console.log('clicked', result);
                        console.log('state is now: ', selectedTemplate);
                      }}
                    >
                      {result.brand} {result.model}
                    </a>
                    <Spacer y={2} />
                  </Row>
                ))}
              </Container>
            )}

            {/* if there is a selected template, show its information */}
            {selectedTemplate && selectedTemplate.id && (
              <>
                <Container css={{ p: '$0', mt: '$15' }}>
                  <Dropzone onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag and drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <Text h3>
                    {selectedTemplate.brand} {selectedTemplate.model},{' '}
                    {Category[selectedTemplate.category as keyof typeof Category]}
                  </Text>
                  {/* TODO: Add images, description etc. here after data is populated */}
                  {/* <pre>{JSON.stringify(selectedTemplate)}</pre> */}
                  <Spacer y={2} />
                </Container>
                <Container
                  fluid
                  display="flex"
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                  css={{ p: '$5' }}
                >
                  <Button onClick={handleAddItem}>Add to my items</Button>
                </Container>
              </>
            )}

            {/* <input type="submit" /> */}
          </Container>
        </Card>
      </Container>
    </Layout>
  );
}
