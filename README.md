# nomad-react-native
노마드 리액트 네이티브 App Study

~ 챕터 2 location 전까지 메모

1. 웹처럼 div p span h1,h2,h3 이런거 못씀 
2. 모든 텍스트는 text component 안에 있어야 된다.
3. 스타일은 StyleSheet.create 쓰거나 object를 만들어 줄 수 있다. (추천은 StyleSheet.create를 써야된다. 자동완성때문에)
4. 모바일(reactNative)에서의 flex direction의 기본값은 Column이다. 따로 row로 설정하지않는이상(웹에서의 기본값은 row)
5. width, height는 안좋은 선택 flex(비율) 를 써라\
6. scrollView는 flex를 줄 필요가 없다.
7. 휴대폰 width, height ⇒ Dimension api

<View>

<Text></Text>

</View>

const styles = StyleSheet.create({

flex: 1,

…

}) ← 자동완성이 된다. 하나의 object
