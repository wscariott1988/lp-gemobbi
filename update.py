import pathlib

file_path = 'index.html'
text = pathlib.Path(file_path).read_text(encoding='utf-8')

# 1. Comparações (A Dor e o Efeito)
text = text.replace(
    '<div class="bg-surface p-10 rounded-sm border-l-4 border-red-600 shadow-xl flex flex-col h-full">',
    '<div class="bg-[#242424] p-8 md:p-10 rounded-xl border-l-4 border-red-600 shadow-md flex flex-col h-full border border-y-white/5 border-r-white/5">'
)
text = text.replace(
    '<div\n                    class="bg-surface p-10 rounded-sm border-l-4 border-primary-container shadow-xl flex flex-col h-full relative overflow-hidden">',
    '<div\n                    class="bg-[#242424] p-8 md:p-10 rounded-xl border-l-4 border-primary-container shadow-md flex flex-col h-full relative overflow-hidden border border-y-white/5 border-r-white/5">'
)

# 2. Benefícios (A Solução)
text = text.replace('<div class="flex gap-5">', '<div class="flex gap-5 bg-[#242424] p-6 rounded-xl border border-white/5 shadow-md">')
text = text.replace('<div\n                                class="w-14 h-14 bg-surface-container-high rounded-sm flex items-center justify-center shrink-0 border border-white/5">', '<div\n                                class="w-14 h-14 bg-[#333333] rounded-lg flex items-center justify-center shrink-0 border border-white/10">')

# 3. Matemática
text = text.replace(
    '<div class="bg-surface p-8 md:p-12 rounded-sm mb-12 border border-white/5 relative">',
    '<div class="bg-[#242424] p-8 md:p-12 rounded-xl border border-white/5 shadow-md mb-12 relative">'
)
text = text.replace(
    '<div class="bg-primary-container/5 border-2 border-primary-container p-8 rounded-sm">',
    '<div class="bg-[#333] border border-primary-container/50 p-8 rounded-xl shadow-inner">'
)

# 4. Pré-requisitos (Quem pode participar)
text = text.replace('<div class="flex items-start gap-4">', '<div class="flex items-start gap-4 bg-[#242424] p-5 rounded-xl border border-white/5 shadow-md">')
text = text.replace('<div class="space-y-6 mb-12">', '<div class="space-y-4 mb-12">')

# Exceção: o container do icone location p-8 bg-surface-container-high ...
text = text.replace(
    '<div class="p-8 bg-surface-container-high border-l-4 border-primary-container rounded-sm">',
    '<div class="p-8 bg-[#242424] rounded-xl shadow-md border border-white/5 border-l-4 border-l-primary-container">'
)

# 5. FAQ
text = text.replace(
    'class="group bg-surface border border-white/5 rounded-sm overflow-hidden"',
    'class="group bg-[#242424] border border-white/5 rounded-xl shadow-md overflow-hidden"'
)

pathlib.Path(file_path).write_text(text, encoding='utf-8')
