import {
  defaultImages,
  defaultOption,
  getImageUrl,
  getLeafType,
  getPriority,
  leafTypes,
  priorities
} from './leafUtils';

describe('Security Stream Utility Functions', () => {
  describe('getImageUrl', () => {
    const url = 'http://test.url';
    it('should get the image url from passed data if present', () => {
      expect(getImageUrl(url)).toBe(url);
    });

    it('should get the image url from default set', () => {
      for (const key in defaultImages) {
        if (Object.prototype.hasOwnProperty.call(defaultImages, key)) {
          const receivedUrl = getImageUrl(null, key);
          expect(receivedUrl).toBe(defaultImages[key]);
        }
      }
    });

    it('should default to "default" type', () => {
      expect(getImageUrl(null)).toBe(defaultImages.default);
    });

    it('should return default image if type is invalid', () => {
      expect(getImageUrl(null, 'invalid_type')).toBe(defaultImages.default);
    });
  });

  describe('getPriority', () => {
    it('should only enable priorities from a given set', () => {
      priorities.forEach((priority) => {
        expect(getPriority(priority)).toBe(priority);
      });
    });

    it('should default to none', () => {
      expect(getPriority('made-up-priority')).toBe(defaultOption);
    });
  });

  describe('getLeafType', () => {
    it('should only enable leaf types from a given set', () => {
      leafTypes.forEach((leaf) => {
        expect(getLeafType(leaf)).toBe(leaf);
      });
    });

    it('should default to none', () => {
      expect(getLeafType('made-up-leaf-type')).toBe(defaultOption);
    });
  });
});
