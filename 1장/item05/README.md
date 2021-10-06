## any 타입 지양하기

- 타입스크립트의 타입 시스템은 점진적이며 선택적
- 코드에 타입을 조금씩 추가할 수 있기에 점진적
- 언제든지 타입 체커를 해체할 수 있기에 선택적

```javascript
let age: number;
age = "12"; // 오류남
age = "12" as any;
```

- 타입체커를 통해 에러를 찾아내도 any를 활용하여 이를 해체를 할 수 있음
- 그러나 any를 무지성으로 사용하면 득보다 실임. 꼭 필요한 경우에만 사용하자!

### any 타입에는 타입 언정성이 없음

```javascript
let age: number;
age = "12" as any;
age += 1;

console.log(age); // "121"
```

- number인지 string인지 타입 안정성에 문제 있음

### any는 함수 약속을 무시해 버림

- any를 활용하면 본래 약속하기로 한 타입 사용을 무시할 수 있음

```javascript
function calculateAge(birthDate: Date): number {
  // ...
}

let birthDate: any = "1990-01-19";
calculateAge(birthDate); // 정상적으로 작동함
```

- birthDate를 약속한 Date타입이 아닌 string타입을 사용해도 정상적으로 작동함!

### any타입에는 언어 서비스가 적용되지 않음

- 자동완성 기능과 도움말을 any 사용시 도움받지 못함

### any 타입은 코드 리팩터링 때 버그를 감춤

- any를 활용하면 타입체크를 통과해도 리펙토링한 코드에 에러가 나는지 불명확해짐

### any는 타입 설계를 감춤

- 어플리케이션의 상태 같은 객체 정의는 복잡하지만, any를 사용하면 수많은 속성들을 작성하는 것을 안해도 되어 설계가 불완전해짐

### any는 타입시스템의 신뢰도를 떨어트림

- any를 무지성으로 사용하여 에러를 못잡게 되면 타입시스템에 대한 신뢰도가 떨어짐
