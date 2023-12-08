export default function attachCamera(attachedObj, offsetX, fixedY) {
  onUpdate(() => {
    camPos(attachedObj.pos.x + offsetX, fixedY);
  });
}
