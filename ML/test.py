import torch

a = torch.tensor([[12, 23], [34, 45]])
print(a)

b = a.get_data()
print(b)