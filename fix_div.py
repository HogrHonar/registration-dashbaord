with open("src/app/dashboard/page.tsx", "r") as f:
    code = f.read()

# Replace the closing tag for Branch Distribution
bad = """              </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Department Analysis */}"""

good = """              </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Department Analysis */}"""

code = code.replace(bad, good)

with open("src/app/dashboard/page.tsx", "w") as f:
    f.write(code)
