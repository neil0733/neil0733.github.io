void setup() {
  Serial.begin(115200);
  pinMode(A0, INPUT);//GPIO A0作為輸入
}

void loop() {
  int EKGValue;//宣告變數EKGValue
  EKGValue = analogRead(A0); //讀取的GPIO A0讀取的數值放在EKGValue
  Serial.println(EKGValue); //EKGValue顯示在序列視窗
  delay(20);
}
