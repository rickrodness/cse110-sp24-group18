import { returnColorForMood } from '../../journalNav';

test('Checks correct colors are returned from mood: Neutral', () => {
  expect(returnColorForMood('neutral')).toStrictEqual({'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'});
});