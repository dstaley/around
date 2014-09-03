export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('rooms'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
};