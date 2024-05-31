import { formatToday, getJournals, selectDate, writeFile } from './fileSys.js';
import { loadButtons, buttonListeners, generateToday } from './journalNav.js';
import { setDate, updateJournal, textEditorListeners, updateText } from './textEditor.js';

jest.mock('./fileSys.js');
jest.mock('./journalNav.js');

describe('textEditor.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="title-container"><h4 class="title"></h4></div>
      <div id="content" contenteditable="true"></div>
      <button id="bold-btn"></button>
      <button id="underline-btn"></button>
      <button id="italic-btn"></button>
      <input type="color" id="color-btn"/>
    `;
  });

  describe('setDate', () => {
    it('should set the id of noteTitle to the current date and update text', () => {
      const mockFormatToday = '2024-05-30';
      formatToday.mockReturnValue(mockFormatToday);

      setDate();

      const noteTitle = document.querySelector('.title');
      expect(noteTitle.id).toBe(mockFormatToday);
      expect(updateText).toHaveBeenCalledWith(mockFormatToday);
    });
  });

  describe('updateJournal', () => {
    it('should update the journal content if content is editable', () => {
      const mockDate = '2024-05-30';
      const mockContentHTML = '<p>Test content</p>';
      const mockJournals = {
        [mockDate]: { data: '', title: 'Test Title' }
      };
      getJournals.mockReturnValue(mockJournals);

      document.querySelector('#content').innerHTML = mockContentHTML;
      document.querySelector('.title').id = mockDate;

      updateJournal(mockDate, mockContentHTML);

      expect(mockJournals[mockDate].data).toBe(mockContentHTML);
      expect(writeFile).toHaveBeenCalledWith(mockJournals[mockDate], mockDate);
    });

    it('should return an error message if content is not editable', () => {
      document.querySelector('#content').removeAttribute('contenteditable');

      const result = updateJournal('2024-05-30', '<p>Test content</p>');
      expect(result).toBe('Container not found or not contenteditable');
    });
  });

  describe('textEditorListeners', () => {
    it('should add event listeners to content and noteTitle', () => {
      textEditorListeners();

      const content = document.querySelector('#content');
      const noteTitle = document.querySelector('.title');
      const boldBtn = document.querySelector('#bold-btn');
      const underlineBtn = document.querySelector('#underline-btn');
      const italicBtn = document.querySelector('#italic-btn');
      const colorBtn = document.querySelector('#color-btn');

      // Simulate content input event
      const inputEvent = new Event('input');
      content.dispatchEvent(inputEvent);
      expect(updateJournal).toHaveBeenCalled();
      expect(loadButtons).toHaveBeenCalled();
      expect(buttonListeners).toHaveBeenCalled();

      // Simulate noteTitle click event
      noteTitle.click();
      const input = document.querySelector('.title-input');
      expect(input).not.toBeNull();

      // Simulate blur event on input
      const blurEvent = new Event('blur');
      input.dispatchEvent(blurEvent);
      expect(writeFile).toHaveBeenCalled();
      expect(loadButtons).toHaveBeenCalled();
      expect(buttonListeners).toHaveBeenCalled();

      // Simulate button click events
      boldBtn.click();
      expect(document.queryCommandState('bold')).toBeTruthy();
      
      underlineBtn.click();
      expect(document.queryCommandState('underline')).toBeTruthy();
      
      italicBtn.click();
      expect(document.queryCommandState('italic')).toBeTruthy();

      colorBtn.value = '#ff0000';
      colorBtn.dispatchEvent(new Event('input'));
      expect(document.queryCommandState('foreColor')).toBeTruthy();
    });
  });

  describe('updateText', () => {
    it('should update the text and title of the journal for the given date', () => {
      const mockDate = '2024-05-30';
      const mockJournal = { data: '<p>Test content</p>', title: 'Test Title' };
      const mockJournals = {
        [mockDate]: mockJournal
      };
      getJournals.mockReturnValue(mockJournals);

      updateText(mockDate);

      const contentElement = document.getElementById('content');
      const titleDisplay = document.querySelector('.title-container h4');

      expect(contentElement.innerHTML).toBe(mockJournal.data);
      expect(titleDisplay.innerHTML).toBe(`<b>${mockJournal.title}</b>`);
      expect(titleDisplay.id).toBe(mockDate);
      expect(selectDate).toHaveBeenCalledWith(mockDate);
    });

    it('should generate a new journal if the date does not exist', () => {
      const mockDate = '2024-05-30';
      const mockJournals = {};
      getJournals.mockReturnValue(mockJournals);

      updateText(mockDate);

      expect(generateToday).toHaveBeenCalled();
      expect(selectDate).toHaveBeenCalledWith(mockDate);
    });
  });
});
