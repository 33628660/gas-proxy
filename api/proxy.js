export const config = { runtime: 'edge' };

export default async (req) => {
  const baseUrl = 'https://script.google.com/macros/s/AKfycbzij_2rs1gcHjernEZsMBq1CU2HBwl3hPhyGALUFWLMx-4W0xkCNanZQLYi7VauF8td/exec';
  const url = new URL(req.url.substring(req.url.indexOf('/api/proxy') + '/api/proxy'.length), baseUrl).toString();
  try {
    const r = await fetch(url, { method: req.method, headers: req.headers });
    if (!r.ok) {
      throw new Error(`HTTP error! status = ${r.status}`);
    }
    const body = await r.text();
    return new Response(body, {
      status: r.status,
      headers: { 'Access-Control-Allow-Origin': '*' } // 注意修正了这里的格式
    });
  } catch (error) {
    return new Response(error.message || 'Internal Server Error', { status: 500 });
  }
};
