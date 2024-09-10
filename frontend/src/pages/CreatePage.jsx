import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const { createProduct } = useProductStore()

  const toast = useToast()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true
      })

      if (success) {
        setNewProduct({ name: '', price: '', image: '' })
      }
    }
  }

  return (
    <Container maxW='container.sm'>
      <VStack spacing={8}>
        <Heading as='h1' size='2x1' textAlign='center' mb={8}>
          Create New Product
        </Heading>
        <Box
          w='full'
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded='lg'
          shadow='md'
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button
              w='full'
              colorScheme='blue'
              onClick={handleAddProduct}
            >
              Add product
            </Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage