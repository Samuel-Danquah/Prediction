const API = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';
export default async (request) => {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  const url = new URL(request.url);
  const date = url.searchParams.get('date') || '2026-11-13';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date+'T00:00:00Z'))) return Response.json({error:'Invalid date'}, {status:400});
  const start = new Date(date+'T00:00:00Z');
  const days = Math.min(30,Math.max(1,Number(url.searchParams.get('days')) || 21));
  const dates = Array.from({length:days},(_,i)=>{const d=new Date(start);d.setUTCDate(d.getUTCDate()-i-1);return d.toISOString().slice(0,10).replaceAll('-','')});
  const events=[];const failures=[];
  for(let i=0;i<dates.length;i+=5){
    await Promise.all(dates.slice(i,i+5).map(async day=>{
      try {const res=await fetch(`${API}?dates=${day}&limit=500`,{signal:AbortSignal.timeout(9000),headers:{'Accept':'application/json'}});
        if(!res.ok) throw Error('HTTP '+res.status);
        const body=await res.json();events.push(...(body.events||[]));
      } catch(err){failures.push({date:day,error:String(err.message||err)});}
    }));
  }
  if(!events.length && failures.length) return Response.json({error:'Score provider unavailable',failures},{status:502});
  return Response.json({events,datesChecked:dates.length,failedDates:failures,source:'ESPN scoreboard',retrievedAt:new Date().toISOString()},{headers:{'Cache-Control':'public, max-age=300, s-maxage=300'}});
};
export const config = { path: '/api/espn-scores' };
