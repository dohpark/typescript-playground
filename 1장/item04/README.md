## 아이템4 구조적 타이핑에 익숙해지기

- 자바스크립트는 본질적으로 덕 타이핑(duck typing) 기반
- 구조적 타이핑을 제대로 이해한다면 오류인 경우와 오류가 아닌 경우의 차이를 알 수 있어, 더욱 견고한 코드를 작성할 수 있음!

### 예시1

```javascript
interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "Zee" };
console.log(calculateLength(v));

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function normalize(v: Vector3D) {
  const length = calculateLength(v);
  console.log(length);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}
```

- noramlize 함수를 보면 매개변수 v는 Vector3D를 받도록 되어있음
- 근데 막상 v를 인자로 받은 calculateLength()함수는 Vector2D를 받도록 되어있음
- 그러나 이 경우에는 에러가 안남.
- 그 이유는 구조적 타이핑 관점에서 x와 y가 있기 때문에 cacluateLength()는 v로 유연하게 Vector2D로 호환함
- 즉 `타입스크립트는 매우 열려있음`!

### 예시 2

```javascript
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLengthL1(v: Vector3D) {
  let length = 0;

  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    length += Math.abs(coord);
  }
  return length;
}

const vec3D = { x: 3, y: 4, z: 1, address: "hello" };
console.log(calculateLengthL1(vec3D));
```

- 위의 예시에서 `const coord = v[axis];` 부분은 타입스크립트 에러를 낼꺼임
- 에러 내용은 string은 인덱스로 사용할 수 없기에 암시적으로 'any' 타입이라는 내용
- `interface Vector3D`를 보면 무조건 number을 받기로 하는데 어디서 string이 나왔나
- 아래 예시로 설명드림

```javascript
const vec3D = { x: 3, y: 4, z: 1, address: "hello" };
console.log(calculateLengthL1(vec3D));
```

- 위 예시는 잘 실행됨.
- 왜냐하면 타입스크립트는 구조적으로 열려있기 때문임.
- 구조적으로 열려있기 때문에 x, y, z 외에 다른 값을 받을 수도 있어 axis는 string이 될 가능성도 포함함
- 그 경우를 계산하기에 string은 인덱스로 사용할 수 없다는 내용의 에러가 났었던거임

### 예시 3

```javascript
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const c = new C("instance of C");
const d: C = { foo: "object literal" };
```

- `const d`는 왜 C를 받을 수 있는가
- 왜냐하면 구조적으로 문제가 없기 때문
- string 타입의 foo 속성을 가지며 생성자(Object.prototype으로부터 비롯되는) 가지기 때문에 구조적으로 같음

### 예시 4

- 구조적 타이핑을 활용하여 더 구체적인 인터페이스를 정의하는 것을 권장함

```javascript
interface Author {
  first: string;
  last: string;
}

function getAuthors(database: PostgreDB): Author[] {
  const authorRows = database.runQuery("SELECT FIRST, LAST FROM AUTHORS");
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}
```

- 위의 예시는 아래로 더 정교하게 타입스크립트를 작성할 수 있음

```javascript
interface Author {
  first: string;
  last: string;
}

interface DB {
  runQuery: (sql: string) => any[];
}

function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery("SELECT FIRST, LAST FROM AUTHORS");
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}
```

- PostgreDB는 `runQuery()`를 지니기에 DB interfact를 받아도 PostgreDB를 문제없이 사용할 수 있으며
- 오히려 더 정교하게 타입스크립트를 짤 수 있음
