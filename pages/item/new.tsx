import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Row, Input, Spacer, Loading, Text, Card, Button, Image, Col } from '@nextui-org/react';
import { Layout } from '../../components/Layout';
import debounce from 'lodash.debounce';
import Dropzone from 'react-dropzone';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Trash } from 'phosphor-react';

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

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export default function NewItem() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { data: session, status } = useSession();

  const router = useRouter();

  //   console.log(watch('brand')); // watch input value by passing the name of it

  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({} as SearchResult);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);
    if (!selectedTemplate) {
      setError('No template selected.');
      setIsUploading(false);
      return;
    }

    let image = '';

    if (files.length > 0) {
      image = await handleImageUpload(files);
    }

    const data = await fetch(`/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...selectedTemplate, image }),
    }).then((res) => {
      if (!res.ok) {
        setError('Something went wrong. Try again in a few minutes!');
      }
      return res.json();
    });

    if (!data) {
      setIsUploading(false);
      return;
    }

    console.log('created a new item: ', data);

    // Push to gear page
    router.push('/');
    // setIsUploading(false);
  };

  const debouncedSearchBrand = debounce(searchBrand, 500);

  const handleImageUpload = async (acceptedFiles: any[]) => {
    if (!session || !session.supabaseAccessToken) {
      setError('You are not authorized to access this resource. Try logging in again.');
      return;
    }

    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    const result = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        setError('Something went wrong while uploading your image. Try again in a few minutes!');
      }
      return res.json();
    });

    return result.url;
  };

  return (
    <Layout>
      <Container
        css={{
          mt: '$10',
          pl: '$0',
          pr: '$0',
          '@xsMax': {
            p: '$5',
          },
        }}
      >
        <Text h1>Add gear</Text>
        <Card css={{ p: '$16 0' }}>
          <Container>
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
                        setSelectedTemplate(result);
                        setSearchTerm('');
                        setSearchResults([]);
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
                  <Text h3>
                    {selectedTemplate.brand} {selectedTemplate.model},{' '}
                    {Category[selectedTemplate.category as keyof typeof Category]}
                  </Text>
                  {/* <Spacer y={1} /> */}
                  {/* TODO: Add extra info here */}

                  {files.map((file) => (
                    <Row key={file.name}>
                      <Image
                        objectFit="cover"
                        src={file.preview}
                        css={{
                          m: '$5',
                          maxWidth: '400px',
                          borderRadius: '$md',
                          overflow: 'hidden',
                          bs: '$sm',
                        }}
                        alt={`A preview picture of ${selectedTemplate.brand} ${selectedTemplate.model}`}
                        // Revoke data uri after image is loaded
                        // onLoad={() => {
                        //   URL.revokeObjectURL(file.preview);
                        // }}
                      />
                    </Row>
                  ))}
                  <Dropzone
                    accept={{ 'image/jpeg': ['.jpg', '.jpeg', '.png'] }}
                    multiple={false}
                    disabled={files.length > 0}
                    onDrop={(acceptedFiles) => {
                      console.log('acceptedFiles', acceptedFiles);
                      setFiles(
                        acceptedFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          }),
                        ),
                      );
                    }}
                  >
                    {({ getRootProps, getInputProps, isFocused, isDragAccept, isDragReject }) => (
                      <section>
                        {files.length > 0 && (
                          <Row justify="center" align="center" css={{ p: '$5' }}>
                            <Button
                              size={'sm'}
                              rounded
                              ghost
                              color="error"
                              icon={<Trash size={20} />}
                              onPress={() => {
                                setFiles([]);
                              }}
                            ></Button>
                          </Row>
                        )}
                        {files.length === 0 && (
                          <div
                            {...getRootProps()}
                            style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              padding: '20px',
                              borderWidth: 2,
                              borderRadius: 2,
                              borderColor: getColor({
                                isDragAccept,
                                isDragReject,
                                isFocused,
                              }),
                              borderStyle: 'dashed',
                              // backgroundColor: '#fafafa',
                              color: '#bdbdbd',
                              outline: 'none',
                              transition: 'border .24s ease-in-out',
                            }}
                          >
                            <input {...getInputProps()} />
                            <p>Drag and drop or select an image for your item</p>
                          </div>
                        )}
                      </section>
                    )}
                  </Dropzone>

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
                  <Button onPress={handleAddItem} disabled={isUploading}>
                    {isUploading ? <Loading size="xs" /> : 'Add to my items'}
                  </Button>
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
