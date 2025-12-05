export function isCollide(a,b){
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + (b.width||b.w) ||
    a.y + a.height < b.y ||
    a.y > b.y + (b.height||b.h)
  );
}