import { expect } from 'chai';
import sinon from 'sinon';
import { createCardService } from '../services/createCard.js';
import { CardModel } from '../models/card.model.js';
import { encryptCard } from '../utils/encryptCard.js';

describe('createCardService', () => {
  afterEach(() => {
    sinon.restore();
  });

 it("should create a card", async () => {
  const card = {
    cardNumber: '123456789',
    cardHolder: 'John Doe',
    expirationDate: '12.12.2022',
  };
  
 })
});
