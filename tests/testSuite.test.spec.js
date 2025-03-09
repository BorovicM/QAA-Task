import { test, expect} from '@playwright/test';
import {CareerPage} from '../pages/careerPage'
import formData from '../formData.json'
import { ApiController } from '../pages/apiPetStorePage';
import petData from '../petData.json'

let careerPage;

test.describe("Career Page Tests", () => {
  test.beforeEach(async ({ page }) => {
  careerPage = new CareerPage(page);
  });

  test.afterEach(async ({ page }) => {
  await page.close();
  });
  test('Positive Case', async ({}) => {
  await careerPage.positiveTest(formData);
  await careerPage.assertationForPositiveTest(formData);
  });

  test('Negative Case', async ({}) => {
    await careerPage.negativeTest(formData);
    await careerPage.assertationForNegativeTest(formData);
    });



 test.describe('Pet Controller CRUD Operations', () => {
      let apiController;
    
      test.beforeEach(async ({ page }) => {
        apiController = new ApiController(page);
      });
    
      test('POST /pet - Create a pet', async () => {
        const createdPet = await apiController.createPet(petData);
        if (createdPet.message){
          expect(createdPet.message).toMatch('Invalid input');

        }else{
        expect(createdPet.id).toBe(petData.id)
        expect(createdPet.name).toBe(petData.name);
        expect(createdPet.status).toBe(petData.status);
        }
      });
    
      test('GET /pet/{petId} - Get a pet by id', async () => {
        const pet = await apiController.getPetById(petData.id);
        if (pet.message) {
          expect(pet.message).toMatch(/Pet not found|Invalid pet ID supplied/);
      } else {
          expect(pet.id).toBe(petData.id);
          expect(pet.name).toBe(petData.name);
          expect(pet.status).toBe(petData.status);
      }
      });
    
      test('PUT /pet - Update an existing pet', async () => {
        const updatedPetData = {
          ...petData,
          name: 'newName',
          status: 'sold'
        };
        const updatedPet = await apiController.updatePet(updatedPetData);
        expect(updatedPet.name).toBe(updatedPetData.name);
        expect(updatedPet.status).toBe(updatedPetData.status);
      });
    
      test('DELETE /pet/{petId} - Delete a pet by id', async () => {
        const deleteResponse = await apiController.deletePet(petData.id);
        if (deleteResponse.message === 'Pet deleted') {
          expect(deleteResponse.message).toBe('Pet deleted');
      } else {
        expect(deleteResponse.message).toMatch(/Pet not found|Invalid pet ID supplied/);
      }
      });
});

});