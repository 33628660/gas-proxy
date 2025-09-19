// 文件路径：api/proxy.js
export default async (req) => {
  const url = 'https://script.google.com/macros/s/AKfycbzij_2rs1gcHjernEZsMBq1CU2HBwl3hPhyGALUFWLMx-4W0xkCNanZQLYi7VauF8td/exec' + req.url.split('/api/proxy')[1];
  const response = await fetch(url, {
    method: req.method,
    headers: req.headers,
  });
  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
};

