const key = 'clangates'; 

export function encrypt(data: string): string {
  let result = '';
  for (let i = 0; i < data.length; i++) {

    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }

  return result.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

export function decrypt(data: string): string {
  let result = '';
  for (let i = 0; i < data.length; i += 2) {
    const hex = data.substring(i, i + 2);
    const charCode = parseInt(hex, 16);
    result += String.fromCharCode(charCode ^ key.charCodeAt((i / 2) % key.length));
  }
  return result;
}