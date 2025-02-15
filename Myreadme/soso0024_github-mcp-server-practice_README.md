# GitHub MCP Server Practice Repository

このリポジトリは、GitHub MCP Serverの練習用リポジトリです。

## プロジェクトの目的
- GitHubの基本的な操作の練習
- ブランチの作成と管理
- Pull Requestの作成とレビュー

## 現在の実装
フィボナッチ数列を計算するための異なるアプローチを実装したPythonプログラムが含まれています。

### 実装された機能

1. 再帰的アプローチ（fibonacci_recursive）
2. 反復的アプローチ（fibonacci_iterative）
3. 数列生成機能（fibonacci_sequence）

### 使用方法

```python
# 最初の10項を生成
print(fibonacci_sequence(10))

# 第10項を計算
print(fibonacci_iterative(10))
```

### 性能比較

- 再帰的アプローチ: 理解しやすいが、大きな数に対しては非効率
- 反復的アプローチ: より効率的で、大きな数の計算に適している