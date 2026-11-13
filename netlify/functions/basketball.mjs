const BASE='https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'public, max-age=240, s-maxage=240'}});
const daystr=d=>d.toISOString().slice(0,10).replaceAll('-','');
async function getDay(date){const r=await fetch(`${BASE}?dates=${date}&groups=50&limit=500`,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error(`ESPN ${r.status}`);return (await r.json()).events||[]}
export default async req=>{try{const u=new URL(req.url),date=u.searchParams.get('date')||new Date().toISOString().slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date)))return json({error:'Invalid date'},400);const mode=u.searchParams.get('mode')||'games'; const d=new Date(date+'T00:00:00Z');if(mode==='games'){return json({events:await getDay(daystr(d)),date,source:'ESPN',retrievedAt:new Date().toISOString()})}
 if(mode==='history'){const days=Math.min(35,Math.max(4,Number(u.searchParams.get('days'))||25));const dates=Array.from({length:days},(_,i)=>{let x=new Date(d);x.setUTCDate(x.getUTCDate()-i-1);return daystr(x)});const results=await Promise.allSettled(dates.map(getDay));const events=results.filter(x=>x.status==='fulfilled').flatMap(x=>x.value);return json({events,datesChecked:days,failedDates:results.filter(x=>x.status==='rejected').length,source:'ESPN',retrievedAt:new Date().toISOString()})}return json({error:'Invalid mode'},400)
}catch(e){return json({error:String(e.message||e)},502)}};
export const config={path:'/api/basketball'};
