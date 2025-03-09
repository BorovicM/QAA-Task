import { expect } from 'playwright/test';
export class ApiController {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://petstore.swagger.io/v2/pet';
  }

  async createPet(petData) {
    const response = await this.page.request.post(this.baseUrl, {
      headers: {
        'accept': 'application/json',
    },
      data: petData,
    });
    const responseData = await response.json();

    if (response.status() === 200) {
      console.log('Pet Created:', responseData);
      return responseData; 
  }

  if (response.status() === 405) {
      console.log('Error: Invalid input');
      return { message: 'Invalid input', ...responseData };
  }
    return response.json();
  }

  async getPetById(petId) {
    const response = await this.page.request.get(`${this.baseUrl}/${petId}`, {
      headers: {
          'accept': 'application/json',
      },
  });

  const responseData = await response.json();
    
    if (response.status() === 200) {
        console.log('Pet found:', responseData);
        return responseData; 
    }

    if (response.status() === 404) {
        console.log('Error: Pet not found');
        return { message: 'Pet not found', ...responseData };
    }

    if (response.status() === 400) {
        console.log('Error: Invalid pet ID supplied');
        return { message: 'Invalid pet ID supplied', ...responseData };
    }
    console.log('GET Response:', await response.json());
    expect(response.status()).toBeLessThan(500);
    console.log('Unexpected error:', responseData);
    return response.json();
  }

  async updatePet(petData) {
    const response = await this.page.request.put(this.baseUrl, {
      headers: {
        'accept': 'application/json',
    },
      data: petData,
    });
    expect(response.status()).toBe(200);
    console.log('Updated Pet:', await response.json());
    return response.json();
  }

  async deletePet(petId) {
    const response = await this.page.request.delete(`${this.baseUrl}/${petId}`, {
        headers: {
            'accept': 'application/json',
        },
    });

    const responseData = await response.json();

    if (response.status() === 200) {
        console.log('Pet successfully deleted:', responseData);
        return { message: 'Pet deleted' }; 
    }

    if (response.status() === 404) {
        console.log('Error: Pet not found');
        return { message: 'Pet not found' };
    }

    if (response.status() === 400) {
        console.log('Error: Invalid pet ID supplied');
        return { message: 'Invalid pet ID supplied' };
    }

    return responseData;
}

}
